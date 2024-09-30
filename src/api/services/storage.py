import boto3
from botocore.exceptions import ClientError
from src.api.config import settings

class StorageService:
    """Service class for managing storage operations with Amazon S3"""

    def __init__(self):
        """Initialize the StorageService with S3 client"""
        self.s3_client = boto3.client('s3')
        self.bucket_name = settings.AWS_STORAGE_BUCKET_NAME

    def upload_file(self, file_obj, file_name, content_type):
        """
        Upload a file to S3 bucket

        Args:
            file_obj (File-like object): The file to upload
            file_name (str): The name of the file in S3
            content_type (str): The content type of the file

        Returns:
            str: URL of the uploaded file

        Raises:
            ClientError: If an error occurs during upload
        """
        try:
            self.s3_client.upload_fileobj(
                file_obj,
                self.bucket_name,
                file_name,
                ExtraArgs={'ContentType': content_type}
            )
            return f"https://{self.bucket_name}.s3.amazonaws.com/{file_name}"
        except ClientError as e:
            # Log the error here
            raise

    def download_file(self, file_name):
        """
        Download a file from S3 bucket

        Args:
            file_name (str): The name of the file in S3

        Returns:
            bytes: File content

        Raises:
            ClientError: If an error occurs during download
        """
        try:
            response = self.s3_client.get_object(Bucket=self.bucket_name, Key=file_name)
            return response['Body'].read()
        except ClientError as e:
            # Log the error here
            raise

    def delete_file(self, file_name):
        """
        Delete a file from S3 bucket

        Args:
            file_name (str): The name of the file in S3

        Returns:
            bool: True if deletion was successful, False otherwise

        Raises:
            ClientError: If an error occurs during deletion
        """
        try:
            self.s3_client.delete_object(Bucket=self.bucket_name, Key=file_name)
            return True
        except ClientError as e:
            # Log the error here
            return False

    def generate_presigned_url(self, file_name, expiration=3600):
        """
        Generate a presigned URL for secure file access

        Args:
            file_name (str): The name of the file in S3
            expiration (int): Time in seconds for the presigned URL to remain valid

        Returns:
            str: Presigned URL

        Raises:
            ClientError: If an error occurs during URL generation
        """
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': file_name},
                ExpiresIn=expiration
            )
            return url
        except ClientError as e:
            # Log the error here
            raise

# TODO: Implement proper error handling for S3 operations
# TODO: Add logging for all storage operations
# TODO: Implement retry mechanism for failed S3 operations
# TODO: Add support for different storage classes in S3