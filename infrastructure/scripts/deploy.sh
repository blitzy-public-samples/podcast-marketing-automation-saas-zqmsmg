#!/bin/bash

# Deployment script for the Podcast Marketing Automation SaaS platform

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Function to check if required tools are installed
check_dependencies() {
    echo "Checking dependencies..."
    if ! command -v docker &> /dev/null; then
        echo "Docker is not installed. Please install Docker and try again."
        return 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        echo "Docker Compose is not installed. Please install Docker Compose and try again."
        return 1
    fi

    if ! command -v aws &> /dev/null; then
        echo "AWS CLI is not installed. Please install AWS CLI and try again."
        return 1
    fi

    # Check if AWS CLI is configured
    if ! aws sts get-caller-identity &> /dev/null; then
        echo "AWS CLI is not configured. Please run 'aws configure' and try again."
        return 1
    fi

    echo "All dependencies are installed and configured."
    return 0
}

# Function to build Docker images
build_images() {
    echo "Building Docker images..."
    cd ../docker || exit
    if docker-compose build; then
        echo "Docker images built successfully."
        return 0
    else
        echo "Failed to build Docker images."
        return 1
    fi
}

# Function to push Docker images to ECR
push_images() {
    echo "Pushing Docker images to ECR..."
    # Login to ECR
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPOSITORY

    # Tag and push images
    docker tag podcast-marketing-automation-api:latest $ECR_REPOSITORY/podcast-marketing-automation-api:latest
    docker tag podcast-marketing-automation-frontend:latest $ECR_REPOSITORY/podcast-marketing-automation-frontend:latest

    if docker push $ECR_REPOSITORY/podcast-marketing-automation-api:latest && \
       docker push $ECR_REPOSITORY/podcast-marketing-automation-frontend:latest; then
        echo "Docker images pushed to ECR successfully."
        return 0
    else
        echo "Failed to push Docker images to ECR."
        return 1
    fi
}

# Function to update ECS service
update_ecs_service() {
    local cluster_name=$1
    local service_name=$2

    echo "Updating ECS service: $service_name"
    # Create a new task definition revision
    local task_definition=$(aws ecs describe-task-definition --task-definition $service_name --region $AWS_REGION)
    local new_task_definition=$(echo $task_definition | jq '.taskDefinition | del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .compatibilities)')
    local new_task_definition_arn=$(aws ecs register-task-definition --region $AWS_REGION --cli-input-json "$new_task_definition" | jq -r '.taskDefinition.taskDefinitionArn')

    # Update the service with the new task definition
    if aws ecs update-service --cluster $cluster_name --service $service_name --task-definition $new_task_definition_arn --region $AWS_REGION; then
        echo "ECS service $service_name updated successfully."
        # Wait for service to stabilize
        aws ecs wait services-stable --cluster $cluster_name --services $service_name --region $AWS_REGION
        return 0
    else
        echo "Failed to update ECS service $service_name."
        return 1
    fi
}

# Function to run database migrations
run_database_migrations() {
    echo "Running database migrations..."
    # Get the task definition for the API service
    local task_definition=$(aws ecs describe-task-definition --task-definition $ECS_SERVICE_API --region $AWS_REGION | jq -r '.taskDefinition.taskDefinitionArn')

    # Run the migration command in the API container
    if aws ecs run-task --cluster $ECS_CLUSTER --task-definition $task_definition --overrides '{"containerOverrides": [{"name":"api","command":["python","manage.py","migrate"]}]}' --region $AWS_REGION; then
        echo "Database migrations completed successfully."
        return 0
    else
        echo "Failed to run database migrations."
        return 1
    fi
}

# Main deployment function
main() {
    echo "Starting deployment process..."

    # Check dependencies
    if ! check_dependencies; then
        return 1
    fi

    # Build images
    if ! build_images; then
        return 1
    fi

    # Push images to ECR
    if ! push_images; then
        return 1
    fi

    # Update ECS services
    if ! update_ecs_service $ECS_CLUSTER $ECS_SERVICE_API; then
        return 1
    fi

    if ! update_ecs_service $ECS_CLUSTER $ECS_SERVICE_FRONTEND; then
        return 1
    fi

    # Run database migrations
    if ! run_database_migrations; then
        return 1
    fi

    echo "Deployment completed successfully."
    return 0
}

# Run the main function
main
exit $?