#!/bin/bash

# Podcast Marketing Automation SaaS Platform - Monitoring Script
# This script sets up and configures monitoring tools for the platform

# Check if required tools are installed
command -v aws >/dev/null 2>&1 || { echo >&2 "AWS CLI is required but not installed. Aborting."; exit 1; }
command -v jq >/dev/null 2>&1 || { echo >&2 "jq is required but not installed. Aborting."; exit 1; }

# Function to set up CloudWatch alarms
setup_cloudwatch_alarms() {
    local environment="$1"
    echo "Setting up CloudWatch alarms for environment: $environment"

    # Define alarm thresholds
    CPU_THRESHOLD=80
    MEMORY_THRESHOLD=80
    DISK_THRESHOLD=85
    API_RESPONSE_TIME_THRESHOLD=2
    API_ERROR_RATE_THRESHOLD=5

    # Create CloudWatch alarms for ECS services
    aws cloudwatch put-metric-alarm \
        --alarm-name "${environment}-ecs-cpu-utilization" \
        --alarm-description "Alarm when CPU exceeds ${CPU_THRESHOLD}% for ECS services" \
        --metric-name CPUUtilization \
        --namespace AWS/ECS \
        --statistic Average \
        --period 300 \
        --threshold ${CPU_THRESHOLD} \
        --comparison-operator GreaterThanThreshold \
        --dimensions Name=ClusterName,Value="${environment}-cluster" \
        --evaluation-periods 2 \
        --alarm-actions ${SNS_TOPIC_ARN}

    # Create CloudWatch alarms for RDS instances
    aws cloudwatch put-metric-alarm \
        --alarm-name "${environment}-rds-cpu-utilization" \
        --alarm-description "Alarm when CPU exceeds ${CPU_THRESHOLD}% for RDS" \
        --metric-name CPUUtilization \
        --namespace AWS/RDS \
        --statistic Average \
        --period 300 \
        --threshold ${CPU_THRESHOLD} \
        --comparison-operator GreaterThanThreshold \
        --dimensions Name=DBInstanceIdentifier,Value="${environment}-db" \
        --evaluation-periods 2 \
        --alarm-actions ${SNS_TOPIC_ARN}

    # Create CloudWatch alarms for ElastiCache clusters
    aws cloudwatch put-metric-alarm \
        --alarm-name "${environment}-elasticache-cpu-utilization" \
        --alarm-description "Alarm when CPU exceeds ${CPU_THRESHOLD}% for ElastiCache" \
        --metric-name CPUUtilization \
        --namespace AWS/ElastiCache \
        --statistic Average \
        --period 300 \
        --threshold ${CPU_THRESHOLD} \
        --comparison-operator GreaterThanThreshold \
        --dimensions Name=CacheClusterId,Value="${environment}-cache" \
        --evaluation-periods 2 \
        --alarm-actions ${SNS_TOPIC_ARN}

    # Set up alarms for API response times and error rates
    aws cloudwatch put-metric-alarm \
        --alarm-name "${environment}-api-response-time" \
        --alarm-description "Alarm when API response time exceeds ${API_RESPONSE_TIME_THRESHOLD} seconds" \
        --metric-name Duration \
        --namespace AWS/ApiGateway \
        --statistic Average \
        --period 300 \
        --threshold ${API_RESPONSE_TIME_THRESHOLD} \
        --comparison-operator GreaterThanThreshold \
        --dimensions Name=ApiName,Value="${environment}-api" \
        --evaluation-periods 2 \
        --alarm-actions ${SNS_TOPIC_ARN}

    aws cloudwatch put-metric-alarm \
        --alarm-name "${environment}-api-error-rate" \
        --alarm-description "Alarm when API error rate exceeds ${API_ERROR_RATE_THRESHOLD}%" \
        --metric-name 5XXError \
        --namespace AWS/ApiGateway \
        --statistic Average \
        --period 300 \
        --threshold ${API_ERROR_RATE_THRESHOLD} \
        --comparison-operator GreaterThanThreshold \
        --dimensions Name=ApiName,Value="${environment}-api" \
        --evaluation-periods 2 \
        --alarm-actions ${SNS_TOPIC_ARN}

    echo "CloudWatch alarms set up successfully"
}

# Function to configure log aggregation
configure_log_aggregation() {
    local log_group="$1"
    echo "Configuring log aggregation for log group: $log_group"

    # Create CloudWatch log groups for application logs
    aws logs create-log-group --log-group-name "$log_group"

    # Configure log retention periods (e.g., 30 days)
    aws logs put-retention-policy --log-group-name "$log_group" --retention-in-days 30

    # Set up log streams for different components
    components=("api" "workers" "database")
    for component in "${components[@]}"; do
        aws logs create-log-stream --log-group-name "$log_group" --log-stream-name "$component"
    done

    echo "Log aggregation configured successfully"
}

# Function to set up CloudWatch dashboard
setup_dashboard() {
    local dashboard_name="$1"
    echo "Setting up CloudWatch dashboard: $dashboard_name"

    # Define dashboard layout and widgets
    dashboard_body=$(cat <<EOF
{
    "widgets": [
        {
            "type": "metric",
            "x": 0,
            "y": 0,
            "width": 12,
            "height": 6,
            "properties": {
                "metrics": [
                    [ "AWS/ECS", "CPUUtilization", "ClusterName", "${ENVIRONMENT}-cluster" ],
                    [ "AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", "${ENVIRONMENT}-db" ],
                    [ "AWS/ElastiCache", "CPUUtilization", "CacheClusterId", "${ENVIRONMENT}-cache" ]
                ],
                "view": "timeSeries",
                "stacked": false,
                "region": "${AWS_REGION}",
                "title": "CPU Utilization"
            }
        },
        {
            "type": "metric",
            "x": 12,
            "y": 0,
            "width": 12,
            "height": 6,
            "properties": {
                "metrics": [
                    [ "AWS/ApiGateway", "Duration", "ApiName", "${ENVIRONMENT}-api" ],
                    [ "AWS/ApiGateway", "5XXError", "ApiName", "${ENVIRONMENT}-api" ]
                ],
                "view": "timeSeries",
                "stacked": false,
                "region": "${AWS_REGION}",
                "title": "API Performance"
            }
        }
    ]
}
EOF
)

    # Create or update the dashboard
    aws cloudwatch put-dashboard --dashboard-name "$dashboard_name" --dashboard-body "$dashboard_body"

    echo "CloudWatch dashboard set up successfully"
}

# Function to configure alert notifications
configure_alerts() {
    local sns_topic_arn="$1"
    echo "Configuring alert notifications for SNS topic: $sns_topic_arn"

    # Create an SNS topic if it doesn't exist
    if ! aws sns get-topic-attributes --topic-arn "$sns_topic_arn" >/dev/null 2>&1; then
        sns_topic_arn=$(aws sns create-topic --name "${ENVIRONMENT}-alerts" --output text)
        echo "Created new SNS topic: $sns_topic_arn"
    fi

    # Configure email subscription to the SNS topic
    read -p "Enter email address for alert notifications: " email_address
    aws sns subscribe --topic-arn "$sns_topic_arn" --protocol email --notification-endpoint "$email_address"

    echo "Alert notifications configured successfully"
}

# Main function
main() {
    # Parse command-line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --environment)
                ENVIRONMENT="$2"
                shift 2
                ;;
            --log-group)
                LOG_GROUP="$2"
                shift 2
                ;;
            --dashboard-name)
                DASHBOARD_NAME="$2"
                shift 2
                ;;
            --sns-topic-arn)
                SNS_TOPIC_ARN="$2"
                shift 2
                ;;
            *)
                echo "Unknown option: $1"
                exit 1
                ;;
        esac
    done

    # Check required parameters
    if [[ -z "$ENVIRONMENT" || -z "$LOG_GROUP" || -z "$DASHBOARD_NAME" || -z "$SNS_TOPIC_ARN" ]]; then
        echo "Usage: $0 --environment <env> --log-group <log-group> --dashboard-name <name> --sns-topic-arn <arn>"
        exit 1
    fi

    # Set AWS region
    AWS_REGION=$(aws configure get region)

    # Call functions
    setup_cloudwatch_alarms "$ENVIRONMENT"
    configure_log_aggregation "$LOG_GROUP"
    setup_dashboard "$DASHBOARD_NAME"
    configure_alerts "$SNS_TOPIC_ARN"

    echo "Monitoring setup completed successfully"
}

# Run the main function
main "$@"

# Human tasks (commented out)
: <<'HUMAN_TASKS'
1. Review and adjust alarm thresholds based on application-specific requirements
2. Provide SNS topic ARN for alert notifications
3. Customize dashboard layout and widgets based on specific monitoring needs
HUMAN_TASKS