# Primary hosted zone for the SaaS platform
resource "aws_route53_zone" "main" {
  name    = var.domain_name
  comment = "Managed by Terraform"
}

# A record for www subdomain
resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = module.cloudfront.distribution_domain_name
    zone_id                = module.cloudfront.distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

# A record for api subdomain
resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.${var.domain_name}"
  type    = "A"

  alias {
    name                   = module.ecs.load_balancer_dns_name
    zone_id                = module.ecs.load_balancer_zone_id
    evaluate_target_health = true
  }
}

# Record for ACM certificate validation
resource "aws_route53_record" "cert_validation" {
  zone_id = aws_route53_zone.main.zone_id
  name    = aws_acm_certificate.main.domain_validation_options[0].resource_record_name
  type    = aws_acm_certificate.main.domain_validation_options[0].resource_record_type
  records = [aws_acm_certificate.main.domain_validation_options[0].resource_record_value]
  ttl     = 60
}

# Output the Route 53 zone ID
output "route53_zone_id" {
  value       = aws_route53_zone.main.zone_id
  description = "The ID of the Route 53 hosted zone"
}

# Output the Route 53 name servers
output "route53_name_servers" {
  value       = aws_route53_zone.main.name_servers
  description = "The name servers for the Route 53 hosted zone"
}

# Human tasks (commented)
# TODO: Verify that the domain name variable (var.domain_name) is correctly set in the variables.tf file
# TODO: Ensure that the AWS account has the necessary permissions to manage Route 53 resources
# TODO: Confirm that the CloudFront distribution and ECS load balancer referenced in the A records are correctly configured
# TODO: Review the ACM certificate configuration and ensure it's properly set up for the domain
# TODO: Consider adding additional DNS records if needed (e.g., MX records for email)
# TODO: Implement proper IAM policies to restrict access to Route 53 resources