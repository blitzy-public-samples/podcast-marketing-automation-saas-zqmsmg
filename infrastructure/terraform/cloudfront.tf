# Terraform configuration for Amazon CloudFront distribution
# for the Podcast Marketing Automation SaaS platform

resource "aws_cloudfront_distribution" "podcast_distribution" {
  origin {
    domain_name = aws_s3_bucket.podcast_bucket.bucket_regional_domain_name
    origin_id   = "S3-${var.project_name}-${var.environment}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for ${var.project_name} - ${var.environment}"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.project_name}-${var.environment}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name        = "${var.project_name}-cloudfront-${var.environment}"
    Environment = var.environment
  }
}

# Output: CloudFront Distribution ID
output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.podcast_distribution.id
  description = "The ID of the CloudFront distribution"
}

# Output: CloudFront Domain Name
output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.podcast_distribution.domain_name
  description = "The domain name of the CloudFront distribution"
}

# TODO: Implement the following human tasks:
# 1. Review and adjust the CloudFront distribution settings to ensure they meet the specific requirements of the Podcast Marketing Automation SaaS platform
# 2. Consider setting up a custom domain and SSL certificate for the CloudFront distribution
# 3. Implement proper caching strategies for different types of content (e.g., audio files, images, API responses)
# 4. Set up appropriate security headers and access controls for the CloudFront distribution
# 5. Configure logging and monitoring for the CloudFront distribution