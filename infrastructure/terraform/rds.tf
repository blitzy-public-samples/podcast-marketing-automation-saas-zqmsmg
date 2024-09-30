# RDS Configuration for Podcast Marketing Automation SaaS Platform

# Import required providers
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

# Create DB Subnet Group
resource "aws_db_subnet_group" "podcast_db_subnet_group" {
  name       = "${var.project_name}-${var.environment}-db-subnet-group"
  subnet_ids = var.private_subnets

  tags = {
    Name        = "${var.project_name}-${var.environment}-db-subnet-group"
    Environment = var.environment
  }
}

# Create Security Group for RDS
resource "aws_security_group" "podcast_db_sg" {
  name        = "${var.project_name}-${var.environment}-db-sg"
  description = "Security group for RDS instance"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow PostgreSQL traffic from ECS tasks"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_tasks.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-db-sg"
    Environment = var.environment
  }
}

# Generate random password for RDS
resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

# Create RDS Instance
resource "aws_db_instance" "podcast_db" {
  identifier        = "${var.project_name}-${var.environment}-db"
  engine            = "postgres"
  engine_version    = "13.7"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp2"
  storage_encrypted = true

  db_name  = "${var.project_name}_${var.environment}"
  username = var.db_username
  password = random_password.db_password.result

  db_subnet_group_name   = aws_db_subnet_group.podcast_db_subnet_group.name
  vpc_security_group_ids = [aws_security_group.podcast_db_sg.id]

  multi_az               = var.environment == "production" ? true : false
  backup_retention_period = var.environment == "production" ? 7 : 1
  skip_final_snapshot    = var.environment != "production"
  final_snapshot_identifier = var.environment == "production" ? "${var.project_name}-${var.environment}-final-snapshot" : null

  tags = {
    Name        = "${var.project_name}-${var.environment}-db"
    Environment = var.environment
  }
}

# Output RDS instance details
output "db_instance_endpoint" {
  value       = aws_db_instance.podcast_db.endpoint
  description = "The connection endpoint for the RDS instance"
}

output "db_instance_name" {
  value       = aws_db_instance.podcast_db.db_name
  description = "The name of the database"
}

output "db_instance_username" {
  value       = aws_db_instance.podcast_db.username
  description = "The master username for the database"
}

output "db_instance_port" {
  value       = aws_db_instance.podcast_db.port
  description = "The port on which the database accepts connections"
}

# Human tasks (commented)
# TODO: Review and adjust the RDS instance specifications (e.g., instance class, storage size) based on the expected workload
# TODO: Ensure that the db_username variable is properly set in the variables.tf file
# TODO: Configure appropriate backup and maintenance windows for the RDS instance
# TODO: Set up monitoring and alerting for the RDS instance using CloudWatch
# TODO: Implement a strategy for securely managing and rotating the database password
# TODO: Review the security group rules to ensure they provide the necessary access while maintaining security