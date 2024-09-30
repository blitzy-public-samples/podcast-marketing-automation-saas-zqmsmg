# ElastiCache resources for the Podcast Marketing Automation SaaS platform

# ElastiCache Subnet Group
resource "aws_elasticache_subnet_group" "main" {
  name       = "${var.project_name}-${var.environment}-cache-subnet-group"
  subnet_ids = var.private_subnets

  description = "Subnet group for ElastiCache cluster"
}

# ElastiCache Parameter Group
resource "aws_elasticache_parameter_group" "main" {
  family = "redis6.x"
  name   = "${var.project_name}-${var.environment}-cache-params"

  description = "Parameter group for ElastiCache cluster"

  parameter {
    name  = "maxmemory-policy"
    value = "allkeys-lru"
  }
}

# ElastiCache Cluster
resource "aws_elasticache_cluster" "main" {
  cluster_id           = "${var.project_name}-${var.environment}-cache"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = aws_elasticache_parameter_group.main.name
  subnet_group_name    = aws_elasticache_subnet_group.main.name
  security_group_ids   = [aws_security_group.cache.id]
  port                 = 6379

  description = "ElastiCache cluster for the Podcast Marketing Automation SaaS platform"
}

# Security Group for ElastiCache
resource "aws_security_group" "cache" {
  name        = "${var.project_name}-${var.environment}-cache-sg"
  description = "Security group for ElastiCache cluster"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-cache-sg"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Outputs
output "elasticache_cluster_address" {
  value       = aws_elasticache_cluster.main.cache_nodes[0].address
  description = "The DNS name of the ElastiCache cluster"
}

output "elasticache_cluster_port" {
  value       = aws_elasticache_cluster.main.port
  description = "The port number of the ElastiCache cluster"
}

# Human Tasks (commented)
# TODO: Review and adjust the ElastiCache node type based on the expected cache usage and performance requirements
# TODO: Consider implementing a multi-node ElastiCache cluster for high availability if required
# TODO: Review and adjust the maxmemory-policy parameter based on the caching strategy for the application
# TODO: Ensure that the security group ingress rules are properly configured to allow access only from necessary sources
# TODO: Consider implementing encryption at rest and in transit for the ElastiCache cluster if handling sensitive data