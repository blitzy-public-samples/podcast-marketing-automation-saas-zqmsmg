# Main Terraform configuration file for the Podcast Marketing Automation SaaS platform infrastructure

terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }

  backend "s3" {
    bucket  = var.terraform_state_bucket
    key     = "terraform.tfstate"
    region  = var.aws_region
    encrypt = true
  }
}

# VPC Module
module "vpc" {
  source       = "./vpc"
  aws_region   = var.aws_region
  project_name = var.project_name
  environment  = var.environment
}

# ECS Module
module "ecs" {
  source         = "./ecs"
  aws_region     = var.aws_region
  project_name   = var.project_name
  environment    = var.environment
  vpc_id         = module.vpc.vpc_id
  public_subnets = module.vpc.public_subnets
}

# RDS Module
module "rds" {
  source          = "./rds"
  aws_region      = var.aws_region
  project_name    = var.project_name
  environment     = var.environment
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
}

# S3 Module
module "s3" {
  source       = "./s3"
  project_name = var.project_name
  environment  = var.environment
}

# CloudFront Module
module "cloudfront" {
  source       = "./cloudfront"
  project_name = var.project_name
  environment  = var.environment
  s3_bucket_id = module.s3.bucket_name
}

# Cognito Module
module "cognito" {
  source       = "./cognito"
  project_name = var.project_name
  environment  = var.environment
}

# Lambda Module
module "lambda" {
  source          = "./lambda"
  project_name    = var.project_name
  environment     = var.environment
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
}

# SQS Module
module "sqs" {
  source       = "./sqs"
  project_name = var.project_name
  environment  = var.environment
}

# ElastiCache Module
module "elasticache" {
  source          = "./elasticache"
  project_name    = var.project_name
  environment     = var.environment
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
}

# ECR Module
module "ecr" {
  source       = "./ecr"
  project_name = var.project_name
  environment  = var.environment
}

# Outputs
output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "private_subnets" {
  value = module.vpc.private_subnets
}

output "ecs_cluster_name" {
  value = module.ecs.cluster_name
}

output "rds_endpoint" {
  value = module.rds.db_instance_endpoint
}

output "s3_bucket_name" {
  value = module.s3.bucket_name
}

output "cloudfront_distribution_id" {
  value = module.cloudfront.distribution_id
}

output "cognito_user_pool_id" {
  value = module.cognito.user_pool_id
}

output "lambda_function_name" {
  value = module.lambda.function_name
}

output "sqs_queue_url" {
  value = module.sqs.queue_url
}

output "elasticache_cluster_address" {
  value = module.elasticache.cluster_address
}

output "ecr_repository_url" {
  value = module.ecr.repository_url
}

# Human tasks (commented)
# TODO: Review and adjust the Terraform configuration to ensure it meets the specific requirements of the Podcast Marketing Automation SaaS platform
# TODO: Ensure that all necessary variables are defined in the variables.tf file
# TODO: Configure the providers.tf file with the appropriate AWS provider settings
# TODO: Set up the S3 bucket for storing Terraform state and update the backend configuration accordingly
# TODO: Review and adjust the module configurations to match the desired infrastructure setup
# TODO: Ensure that all sensitive information is properly managed using Terraform variables or AWS Secrets Manager