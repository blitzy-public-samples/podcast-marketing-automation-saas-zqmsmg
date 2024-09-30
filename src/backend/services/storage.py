import boto3
from botocore.exceptions import ClientError
from django.conf import settings
from django.core.files.storage import default_storage
import logging

# Configure logging
logger = logging.getLogger(__name__)

# Initialize S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
)

def upload_file(file_obj, file_name):
    """
    Uploads a file to the configured S3 bucket.

    Args:
        file_obj (File): File object to upload
        file_name (str): Name of the file in S3

    Returns:
        str: URL of the uploaded file

    Raises:
        ValueError: If file_obj is invalid
        ClientError: If there's an error with the S3 client
    """
    try:
        # Check if file_obj is valid
        if not file_obj or not hasattr(file_obj, 'read'):
            raise ValueError("Invalid file object")

        # Generate a unique file name if not provided
        if not file_name:
            file_name = default_storage.get_available_name(file_obj.name)

        # Upload the file to S3 using boto3
        s3_client.upload_fileobj(
            file_obj,
            settings.AWS_STORAGE_BUCKET_NAME,
            file_name
        )

        # Generate and return the URL of the uploaded file
        url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{file_name}"
        return url

    except ClientError as e:
        logger.error(f"Error uploading file to S3: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during file upload: {str(e)}")
        raise

def download_file(file_name):
    """
    Downloads a file from the configured S3 bucket.

    Args:
        file_name (str): Name of the file in S3

    Returns:
        bytes: File content

    Raises:
        ClientError: If there's an error with the S3 client or the file doesn't exist
    """
    try:
        # Check if file exists in S3
        s3_client.head_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)

        # Download the file using boto3
        response = s3_client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)
        return response['Body'].read()

    except ClientError as e:
        if e.response['Error']['Code'] == "404":
            logger.error(f"The file {file_name} does not exist in the S3 bucket.")
        else:
            logger.error(f"Error downloading file from S3: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during file download: {str(e)}")
        raise

def delete_file(file_name):
    """
    Deletes a file from the configured S3 bucket.

    Args:
        file_name (str): Name of the file in S3

    Returns:
        bool: True if deletion was successful, False otherwise

    Raises:
        ClientError: If there's an error with the S3 client
    """
    try:
        # Check if file exists in S3
        s3_client.head_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)

        # Delete the file using boto3
        s3_client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)
        return True

    except ClientError as e:
        if e.response['Error']['Code'] == "404":
            logger.warning(f"The file {file_name} does not exist in the S3 bucket.")
            return False
        else:
            logger.error(f"Error deleting file from S3: {str(e)}")
            raise
    except Exception as e:
        logger.error(f"Unexpected error during file deletion: {str(e)}")
        raise

def get_file_url(file_name, expiration=3600):
    """
    Generates a pre-signed URL for accessing a file in S3.

    Args:
        file_name (str): Name of the file in S3
        expiration (int): URL expiration time in seconds (default: 1 hour)

    Returns:
        str: Pre-signed URL for the file

    Raises:
        ClientError: If there's an error with the S3 client or the file doesn't exist
    """
    try:
        # Check if file exists in S3
        s3_client.head_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)

        # Generate a pre-signed URL using boto3
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': settings.AWS_STORAGE_BUCKET_NAME, 'Key': file_name},
            ExpiresIn=expiration
        )
        return url

    except ClientError as e:
        if e.response['Error']['Code'] == "404":
            logger.error(f"The file {file_name} does not exist in the S3 bucket.")
        else:
            logger.error(f"Error generating pre-signed URL: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during pre-signed URL generation: {str(e)}")
        raise

# TODO: Implement proper error handling and logging for S3 operations
# TODO: Set up S3 bucket lifecycle policies for managing old or unused files
# TODO: Implement file validation to ensure only allowed file types are uploaded
# TODO: Set up proper IAM roles and policies for S3 access in production