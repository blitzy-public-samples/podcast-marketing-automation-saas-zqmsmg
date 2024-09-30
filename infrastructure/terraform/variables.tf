# AWS Region
variable "aws_region" {
  type        = string
  description = "The AWS region where resources will be created"
  default     = "us-west-2"
}

# Project Name
variable "project_name" {
  type        = string
  description = "The name of the project, used for naming resources"
  default     = "podcast-marketing-automation"
}

# Environment
variable "environment" {
  type        = string
  description = "The deployment environment (e.g., dev, staging, prod)"
  default     = "dev"
}

# Terraform State Bucket
variable "terraform_state_bucket" {
  type        = string
  description = "The name of the S3 bucket for storing Terraform state"
}

# VPC CIDR
variable "vpc_cidr" {
  type        = string
  description = "The CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

# Public Subnet CIDRs
variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for public subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

# Private Subnet CIDRs
variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for private subnets"
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

# RDS Instance Class
variable "db_instance_class" {
  type        = string
  description = "The instance type of the RDS instance"
  default     = "db.t3.micro"
}

# Database Name
variable "db_name" {
  type        = string
  description = "The name of the database to create when the DB instance is created"
  default     = "podcastdb"
}

# Database Username
variable "db_username" {
  type        = string
  description = "Username for the database"
  sensitive   = true
}

# Database Password
variable "db_password" {
  type        = string
  description = "Password for the database"
  sensitive   = true
}

# ECS Task CPU
variable "ecs_task_cpu" {
  type        = number
  description = "The number of cpu units used by the ECS task"
  default     = 256
}

# ECS Task Memory
variable "ecs_task_memory" {
  type        = number
  description = "The amount (in MiB) of memory used by the ECS task"
  default     = 512
}

# ECS Cluster Name
variable "ecs_cluster_name" {
  type        = string
  description = "The name of the ECS cluster"
  default     = "podcast-marketing-cluster"
}

# ECR Repository Name
variable "ecr_repository_name" {
  type        = string
  description = "The name of the ECR repository"
  default     = "podcast-marketing-repo"
}

# Lambda Function Name
variable "lambda_function_name" {
  type        = string
  description = "The name of the Lambda function"
  default     = "podcast-marketing-function"
}

# SQS Queue Name
variable "sqs_queue_name" {
  type        = string
  description = "The name of the SQS queue"
  default     = "podcast-marketing-queue"
}

# ElastiCache Node Type
variable "elasticache_node_type" {
  type        = string
  description = "The compute and memory capacity of the ElastiCache nodes"
  default     = "cache.t3.micro"
}

# Cognito User Pool Name
variable "cognito_user_pool_name" {
  type        = string
  description = "The name of the Cognito User Pool"
  default     = "podcast-marketing-user-pool"
}

# Human Tasks (commented)
# TODO: Review and adjust default values for variables to match project requirements
# TODO: Ensure that sensitive variables (e.g., db_username, db_password) are properly managed and not committed to version control
# TODO: Confirm that all necessary variables for the infrastructure are included
# TODO: Validate that the variable types and descriptions are accurate
# TODO: Consider adding any additional variables that might be needed for future scalability or customization