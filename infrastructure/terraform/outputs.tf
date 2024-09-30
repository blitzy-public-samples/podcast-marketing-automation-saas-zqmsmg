# Terraform outputs file for the Podcast Marketing Automation SaaS platform infrastructure

# VPC Outputs
output "vpc_id" {
  value       = module.vpc.vpc_id
  description = "The ID of the VPC"
}

output "public_subnets" {
  value       = module.vpc.public_subnets
  description = "List of IDs of public subnets"
}

output "private_subnets" {
  value       = module.vpc.private_subnets
  description = "List of IDs of private subnets"
}

# ECS Outputs
output "ecs_cluster_name" {
  value       = module.ecs.cluster_name
  description = "Name of the ECS cluster"
}

# RDS Outputs
output "rds_endpoint" {
  value       = module.rds.db_instance_endpoint
  description = "Connection endpoint for the RDS instance"
}

# S3 Outputs
output "s3_bucket_name" {
  value       = module.s3.bucket_name
  description = "Name of the S3 bucket for storing podcast files"
}

# CloudFront Outputs
output "cloudfront_distribution_id" {
  value       = module.cloudfront.distribution_id
  description = "ID of the CloudFront distribution"
}

output "cloudfront_domain_name" {
  value       = module.cloudfront.domain_name
  description = "Domain name of the CloudFront distribution"
}

# Cognito Outputs
output "cognito_user_pool_id" {
  value       = module.cognito.user_pool_id
  description = "ID of the Cognito User Pool"
}

output "cognito_app_client_id" {
  value       = module.cognito.app_client_id
  description = "ID of the Cognito App Client"
}

# Lambda Outputs
output "lambda_function_name" {
  value       = module.lambda.function_name
  description = "Name of the Lambda function for podcast processing"
}

# SQS Outputs
output "sqs_queue_url" {
  value       = module.sqs.queue_url
  description = "URL of the SQS queue for podcast processing tasks"
}

# ElastiCache Outputs
output "elasticache_cluster_address" {
  value       = module.elasticache.cluster_address
  description = "Address of the ElastiCache cluster"
}

# ECR Outputs
output "ecr_repository_url" {
  value       = module.ecr.repository_url
  description = "URL of the ECR repository for storing Docker images"
}

# Human Tasks (commented)
# TODO: Review and verify that all necessary outputs are included for the Podcast Marketing Automation SaaS platform
# TODO: Ensure that sensitive information is not exposed through outputs
# TODO: Add any additional outputs that may be required for integration with other systems or for operational purposes