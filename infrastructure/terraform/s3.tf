# AWS S3 bucket for storing podcast audio files and related assets
resource "aws_s3_bucket" "podcast_files" {
  bucket = "${var.project_name}-${var.environment}-podcast-files"

  tags = {
    Name        = "${var.project_name}-${var.environment}-podcast-files"
    Environment = var.environment
  }
}

# Block public access to the podcast files S3 bucket
resource "aws_s3_bucket_public_access_block" "podcast_files" {
  bucket = aws_s3_bucket.podcast_files.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable versioning for the podcast files S3 bucket
resource "aws_s3_bucket_versioning" "podcast_files" {
  bucket = aws_s3_bucket.podcast_files.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Enable server-side encryption for the podcast files S3 bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "podcast_files" {
  bucket = aws_s3_bucket.podcast_files.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Configure lifecycle rules for the podcast files S3 bucket
resource "aws_s3_bucket_lifecycle_configuration" "podcast_files" {
  bucket = aws_s3_bucket.podcast_files.id

  rule {
    id     = "transition_to_ia"
    status = "Enabled"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
  }

  rule {
    id     = "transition_to_glacier"
    status = "Enabled"

    transition {
      days          = 60
      storage_class = "GLACIER"
    }
  }
}

# Output the name of the S3 bucket for podcast files
output "podcast_files_bucket_name" {
  description = "The name of the S3 bucket for podcast files"
  value       = aws_s3_bucket.podcast_files.id
}

# Output the ARN of the S3 bucket for podcast files
output "podcast_files_bucket_arn" {
  description = "The ARN of the S3 bucket for podcast files"
  value       = aws_s3_bucket.podcast_files.arn
}

# Human tasks:
# TODO: Review and adjust the S3 bucket configuration to ensure it meets the specific requirements of the Podcast Marketing Automation SaaS platform
# TODO: Confirm that the lifecycle rules for transitioning objects to STANDARD_IA and GLACIER storage classes are appropriate for the project's needs
# TODO: Ensure that the bucket naming convention follows the company's standards and is globally unique
# TODO: Consider adding additional bucket policies or CORS configuration if needed for the application's functionality
# TODO: Evaluate if additional S3 buckets are needed for other purposes (e.g., static website hosting, logs) and add them to this configuration