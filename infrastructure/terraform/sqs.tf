# Terraform configuration for Amazon SQS (Simple Queue Service) resources
# used in the Podcast Marketing Automation SaaS platform

# Import required variables
variable "project_name" {}
variable "environment" {}

# Main SQS Queue
resource "aws_sqs_queue" "main_queue" {
  name                       = "${var.project_name}-${var.environment}-main-queue"
  delay_seconds              = 0
  max_message_size           = 262144  # 256 KB
  message_retention_seconds  = 345600  # 4 days
  receive_wait_time_seconds  = 10
  visibility_timeout_seconds = 30

  tags = {
    Name        = "${var.project_name}-${var.environment}-main-queue"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Dead Letter Queue (DLQ)
resource "aws_sqs_queue" "dlq" {
  name                      = "${var.project_name}-${var.environment}-dlq"
  message_retention_seconds = 1209600  # 14 days

  tags = {
    Name        = "${var.project_name}-${var.environment}-dlq"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Main Queue Policy
resource "aws_sqs_queue_policy" "main_queue_policy" {
  queue_url = aws_sqs_queue.main_queue.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "sqspolicy"
    Statement = [
      {
        Sid       = "First"
        Effect    = "Allow"
        Principal = "*"
        Action    = "sqs:SendMessage"
        Resource  = aws_sqs_queue.main_queue.arn
        Condition = {
          ArnEquals = {
            "aws:SourceArn" = aws_sqs_queue.main_queue.arn
          }
        }
      }
    ]
  })
}

# Outputs
output "main_queue_url" {
  description = "URL of the main SQS queue"
  value       = aws_sqs_queue.main_queue.id
}

output "main_queue_arn" {
  description = "ARN of the main SQS queue"
  value       = aws_sqs_queue.main_queue.arn
}

output "dlq_url" {
  description = "URL of the Dead Letter Queue"
  value       = aws_sqs_queue.dlq.id
}

output "dlq_arn" {
  description = "ARN of the Dead Letter Queue"
  value       = aws_sqs_queue.dlq.arn
}

# TODO: Implement the following human tasks:
# 1. Review and adjust the SQS queue configurations to ensure they meet the specific requirements of the Podcast Marketing Automation SaaS platform
# 2. Consider implementing additional queues for specific tasks if needed (e.g., transcription queue, marketing content generation queue)
# 3. Review and adjust the queue policy to ensure proper access control and security
# 4. Configure Dead Letter Queue (DLQ) redrive policy for the main queue
# 5. Implement proper error handling and monitoring for SQS queues in the application code