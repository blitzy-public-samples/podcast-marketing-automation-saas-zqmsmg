#!/bin/bash

# Podcast Marketing Automation SaaS platform - Automated Backup Script
# This script performs automated backups of critical data for the platform

# Set error handling
set -e

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found"
    exit 1
fi

# Global variables
BACKUP_BUCKET=${BACKUP_BUCKET:-"s3://podcast-automation-backups"}
RDS_INSTANCE=${RDS_INSTANCE:-"podcast-automation-db"}
BACKUP_RETENTION=${BACKUP_RETENTION:-30}
LOG_FILE="/var/log/podcast_backup.log"

# Function to log backup status
log_backup_status() {
    local status=$1
    local message=$2
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$timestamp] $status: $message" >> "$LOG_FILE"
    
    if [ "$status" = "ERROR" ]; then
        # TODO: Implement notification system (e.g., using AWS SNS)
        echo "Error occurred: $message" >&2
    fi
}

# Function to backup the database
backup_database() {
    local timestamp=$(date +%Y%m%d%H%M%S)
    local snapshot_name="podcast-automation-snapshot-$timestamp"
    
    echo "Creating RDS snapshot: $snapshot_name"
    aws rds create-db-snapshot \
        --db-instance-identifier "$RDS_INSTANCE" \
        --db-snapshot-identifier "$snapshot_name"
    
    echo "Waiting for snapshot to complete..."
    aws rds wait db-snapshot-completed \
        --db-snapshot-identifier "$snapshot_name"
    
    echo "Snapshot created successfully: $snapshot_name"
    echo "$snapshot_name"
}

# Function to backup S3 data
backup_s3_data() {
    echo "Syncing S3 data to backup bucket"
    if aws s3 sync s3://podcast-automation-production "$BACKUP_BUCKET/production-backup" --delete; then
        echo "S3 sync completed successfully"
        return 0
    else
        echo "S3 sync failed"
        return 1
    fi
}

# Function to clean up old backups
cleanup_old_backups() {
    local retention_date=$(date -d "$BACKUP_RETENTION days ago" +%s)
    
    echo "Cleaning up old RDS snapshots"
    aws rds describe-db-snapshots --db-instance-identifier "$RDS_INSTANCE" --query "DBSnapshots[?SnapshotCreateTime<='$retention_date'].[DBSnapshotIdentifier]" --output text | while read -r snapshot; do
        aws rds delete-db-snapshot --db-snapshot-identifier "$snapshot"
        echo "Deleted old snapshot: $snapshot"
    done
    
    echo "Cleaning up old S3 backups"
    aws s3 rm "$BACKUP_BUCKET" --recursive --exclude "*" --include "production-backup/*" --older-than "$BACKUP_RETENTION days"
    
    echo "Cleanup completed"
    return 0
}

# Main function
main() {
    log_backup_status "INFO" "Starting backup process"
    
    # Backup database
    db_snapshot=$(backup_database)
    if [ $? -eq 0 ]; then
        log_backup_status "INFO" "Database backup successful: $db_snapshot"
    else
        log_backup_status "ERROR" "Database backup failed"
        return 1
    fi
    
    # Backup S3 data
    if backup_s3_data; then
        log_backup_status "INFO" "S3 data backup successful"
    else
        log_backup_status "ERROR" "S3 data backup failed"
        return 1
    fi
    
    # Cleanup old backups
    if cleanup_old_backups; then
        log_backup_status "INFO" "Old backups cleaned up successfully"
    else
        log_backup_status "ERROR" "Failed to clean up old backups"
        return 1
    fi
    
    log_backup_status "INFO" "Backup process completed successfully"
    return 0
}

# Run main function
main
exit $?

# TODO: Human tasks
# 1. Set up AWS CLI credentials with appropriate permissions for RDS and S3 operations
# 2. Configure backup notification system (e.g., SNS topic) for error alerts
# 3. Verify and adjust the BACKUP_RETENTION period based on business requirements and compliance needs