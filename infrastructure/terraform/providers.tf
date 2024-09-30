# Configure the AWS Provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

# Note: The following variables are expected to be defined in the variables.tf file:
# - var.aws_region: The AWS region where resources will be created
# - var.aws_profile: The AWS profile to use for authentication

# TODO: Ensure that the AWS provider configuration matches the project's AWS account and desired region
# TODO: Verify that the AWS profile specified in the configuration exists in the local AWS credentials file
# TODO: Consider adding additional provider configurations if needed (e.g., for multi-region deployments)