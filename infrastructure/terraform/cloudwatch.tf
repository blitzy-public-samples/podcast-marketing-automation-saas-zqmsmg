# CloudWatch Log Group for ECS
resource "aws_cloudwatch_log_group" "app_log_group" {
  name              = "/ecs/${var.project_name}-${var.environment}"
  retention_in_days = 30

  tags = {
    Name        = "${var.project_name}-${var.environment}-logs"
    Environment = var.environment
    Project     = var.project_name
  }
}

# CloudWatch Metric Alarm for high CPU utilization
resource "aws_cloudwatch_metric_alarm" "high_cpu_utilization" {
  alarm_name          = "${var.project_name}-${var.environment}-high-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "This metric monitors ECS CPU utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    ClusterName = "${var.project_name}-${var.environment}-cluster"
  }
}

# CloudWatch Metric Alarm for high memory utilization
resource "aws_cloudwatch_metric_alarm" "high_memory_utilization" {
  alarm_name          = "${var.project_name}-${var.environment}-high-memory-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "MemoryUtilization"
  namespace           = "AWS/ECS"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "This metric monitors ECS Memory utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    ClusterName = "${var.project_name}-${var.environment}-cluster"
  }
}

# CloudWatch Dashboard
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "${var.project_name}-${var.environment}-dashboard"

  dashboard_body = <<EOF
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
          [ "AWS/ECS", "CPUUtilization", "ClusterName", "${var.project_name}-${var.environment}-cluster" ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "${var.aws_region}",
        "title": "ECS CPU Utilization"
      }
    },
    {
      "type": "metric",
      "x": 0,
      "y": 6,
      "width": 12,
      "height": 6,
      "properties": {
        "metrics": [
          [ "AWS/ECS", "MemoryUtilization", "ClusterName", "${var.project_name}-${var.environment}-cluster" ]
        ],
        "period": 300,
        "stat": "Average",
        "region": "${var.aws_region}",
        "title": "ECS Memory Utilization"
      }
    }
  ]
}
EOF
}

# SNS Topic for CloudWatch Alarms
resource "aws_sns_topic" "alerts" {
  name = "${var.project_name}-${var.environment}-alerts"
}

# CloudWatch Log Metric Filter for Error Logs
resource "aws_cloudwatch_log_metric_filter" "error_logs" {
  name           = "${var.project_name}-${var.environment}-error-logs"
  pattern        = "ERROR"
  log_group_name = aws_cloudwatch_log_group.app_log_group.name

  metric_transformation {
    name      = "ErrorCount"
    namespace = "${var.project_name}/${var.environment}"
    value     = "1"
  }
}

# Outputs
output "cloudwatch_log_group_name" {
  value       = aws_cloudwatch_log_group.app_log_group.name
  description = "The name of the CloudWatch log group"
}

output "sns_topic_arn" {
  value       = aws_sns_topic.alerts.arn
  description = "The ARN of the SNS topic for CloudWatch alarms"
}

# Human tasks (commented)
# TODO: Review and adjust CloudWatch metric alarms thresholds based on application requirements
# TODO: Set up appropriate SNS topic subscriptions for receiving CloudWatch alarms
# TODO: Customize the CloudWatch dashboard to include relevant metrics for the Podcast Marketing Automation SaaS platform
# TODO: Configure additional log metric filters based on specific application logging patterns