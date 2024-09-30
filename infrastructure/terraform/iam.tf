# IAM roles and policies for the Podcast Marketing Automation SaaS platform

# ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project_name}-${var.environment}-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-${var.environment}-ecs-task-execution-role"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Attach the ECS Task Execution Role Policy to the ECS Task Execution Role
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Lambda Execution Role
resource "aws_iam_role" "lambda_execution_role" {
  name = "${var.project_name}-${var.environment}-lambda-execution-role"

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

  tags = {
    Name        = "${var.project_name}-${var.environment}-lambda-execution-role"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Attach the Lambda Basic Execution Role Policy to the Lambda Execution Role
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# CloudWatch Events Role
resource "aws_iam_role" "cloudwatch_events_role" {
  name = "${var.project_name}-${var.environment}-cloudwatch-events-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "events.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-${var.environment}-cloudwatch-events-role"
    Environment = var.environment
    Project     = var.project_name
  }
}

# CloudWatch Events Policy
resource "aws_iam_role_policy" "cloudwatch_events_policy" {
  name = "${var.project_name}-${var.environment}-cloudwatch-events-policy"
  role = aws_iam_role.cloudwatch_events_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "lambda:InvokeFunction"
        ]
        Resource = "*"
      }
    ]
  })
}

# CI/CD User
resource "aws_iam_user" "ci_cd_user" {
  name = "${var.project_name}-${var.environment}-ci-cd-user"
  path = "/system/"

  tags = {
    Name        = "${var.project_name}-${var.environment}-ci-cd-user"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Attach the CodeBuild Admin Access policy to the CI/CD User
resource "aws_iam_user_policy_attachment" "ci_cd_user_policy" {
  user       = aws_iam_user.ci_cd_user.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeBuildAdminAccess"
}

# Outputs
output "ecs_task_execution_role_arn" {
  value       = aws_iam_role.ecs_task_execution_role.arn
  description = "ARN of the ECS task execution IAM role"
}

output "lambda_execution_role_arn" {
  value       = aws_iam_role.lambda_execution_role.arn
  description = "ARN of the Lambda execution IAM role"
}

output "cloudwatch_events_role_arn" {
  value       = aws_iam_role.cloudwatch_events_role.arn
  description = "ARN of the CloudWatch Events IAM role"
}

output "ci_cd_user_arn" {
  value       = aws_iam_user.ci_cd_user.arn
  description = "ARN of the CI/CD IAM user"
}

# TODO: Review and adjust the IAM roles and policies to ensure they follow the principle of least privilege
# TODO: Define the exact permissions required for each role based on the specific needs of the Podcast Marketing Automation SaaS platform
# TODO: Implement additional IAM roles or policies if required by other AWS services used in the project
# TODO: Ensure that the CI/CD user has the minimum required permissions for the deployment process
# TODO: Consider using AWS IAM Access Analyzer to validate and refine IAM policies