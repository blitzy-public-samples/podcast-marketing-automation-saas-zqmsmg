# Import required providers
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2"
    }
  }
}

# Data source for creating ZIP archives of Lambda functions
data "archive_file" "transcription_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambda_functions/transcription"
  output_path = "${path.module}/lambda_functions/transcription.zip"
}

data "archive_file" "content_generation_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambda_functions/content_generation"
  output_path = "${path.module}/lambda_functions/content_generation.zip"
}

# Lambda function for podcast transcription
resource "aws_lambda_function" "transcription_function" {
  filename         = data.archive_file.transcription_lambda.output_path
  function_name    = "${var.project_name}-${var.environment}-transcription"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  runtime          = "python3.9"
  timeout          = 300
  memory_size      = 1024

  environment {
    variables = {
      ENVIRONMENT = var.environment
      S3_BUCKET   = var.s3_bucket_name
    }
  }

  vpc_config {
    subnet_ids         = var.private_subnets
    security_group_ids = [aws_security_group.lambda_sg.id]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-transcription"
    Environment = var.environment
  }
}

# Lambda function for AI-driven content generation
resource "aws_lambda_function" "content_generation_function" {
  filename         = data.archive_file.content_generation_lambda.output_path
  function_name    = "${var.project_name}-${var.environment}-content-generation"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  runtime          = "python3.9"
  timeout          = 300
  memory_size      = 1024

  environment {
    variables = {
      ENVIRONMENT    = var.environment
      OPENAI_API_KEY = var.openai_api_key
    }
  }

  vpc_config {
    subnet_ids         = var.private_subnets
    security_group_ids = [aws_security_group.lambda_sg.id]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-content-generation"
    Environment = var.environment
  }
}

# IAM role for Lambda functions
resource "aws_iam_role" "lambda_role" {
  name = "${var.project_name}-${var.environment}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach basic execution policy to Lambda role
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Attach VPC access policy to Lambda role
resource "aws_iam_role_policy_attachment" "lambda_vpc_access" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# Security group for Lambda functions
resource "aws_security_group" "lambda_sg" {
  name        = "${var.project_name}-${var.environment}-lambda-sg"
  description = "Security group for Lambda functions"
  vpc_id      = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-lambda-sg"
    Environment = var.environment
  }
}

# Output the ARNs of the Lambda functions
output "transcription_function_arn" {
  description = "ARN of the transcription Lambda function"
  value       = aws_lambda_function.transcription_function.arn
}

output "content_generation_function_arn" {
  description = "ARN of the content generation Lambda function"
  value       = aws_lambda_function.content_generation_function.arn
}

# TODO: Implement the following human tasks:
# 1. Implement the Lambda function code for transcription in the lambda_functions/transcription directory
# 2. Implement the Lambda function code for content generation in the lambda_functions/content_generation directory
# 3. Review and adjust the IAM roles and policies to ensure least privilege access for Lambda functions
# 4. Configure the OpenAI API key securely, preferably using AWS Secrets Manager
# 5. Optimize Lambda function configurations (memory, timeout) based on expected workloads
# 6. Implement proper error handling and logging in Lambda functions
# 7. Set up CloudWatch alarms for Lambda function errors and performance metrics