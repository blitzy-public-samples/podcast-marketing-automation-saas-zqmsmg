# for the Podcast Marketing Automation SaaS platform

# Import the AWS provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# Create the ECR repository
resource "aws_ecr_repository" "podcast_app" {
  name                 = "${var.project_name}-${var.environment}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-ecr"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Create the ECR lifecycle policy
resource "aws_ecr_lifecycle_policy" "podcast_app" {
  repository = aws_ecr_repository.podcast_app.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 30 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 30
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# Output the ECR repository URL
output "repository_url" {
  description = "The URL of the ECR repository"
  value       = aws_ecr_repository.podcast_app.repository_url
}

# Output the ECR repository ARN
output "repository_arn" {
  description = "The ARN of the ECR repository"
  value       = aws_ecr_repository.podcast_app.arn
}

# Human tasks (commented)
# TODO: Review and adjust the ECR repository configuration to ensure it meets the specific requirements of the Podcast Marketing Automation SaaS platform
# TODO: Consider implementing additional ECR lifecycle policies based on the project's specific needs
# TODO: Ensure that proper IAM roles and policies are in place for ECR access
# TODO: Verify that the encryption configuration meets the security requirements of the project