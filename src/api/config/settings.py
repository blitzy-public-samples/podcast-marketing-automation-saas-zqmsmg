import os
from pathlib import Path
import environ
import dj_database_url
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Initialize environment variables
env = environ.Env()

# Reading .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', default=False)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1'])

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'apps.authentication',
    'apps.podcasts',
    'apps.episodes',
    'apps.transcripts',
    'apps.marketing',
    'apps.social_media',
    'apps.analytics',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'middleware.jwt_auth.JWTAuthMiddleware',
    'middleware.logging.LoggingMiddleware',
]

ROOT_URLCONF = 'config.urls'

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DATABASES = {
    'default': dj_database_url.config(default=env('DATABASE_URL'))
}

# Custom user model
AUTH_USER_MODEL = 'authentication.User'

# Rest Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

# JWT settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

# CORS settings
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=['http://localhost:3000'])

# AWS settings
AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# Celery settings
CELERY_BROKER_URL = env('CELERY_BROKER_URL')
CELERY_RESULT_BACKEND = env('CELERY_RESULT_BACKEND')

# Google Cloud credentials
GOOGLE_CLOUD_CREDENTIALS = env('GOOGLE_CLOUD_CREDENTIALS')

# OpenAI API key
OPENAI_API_KEY = env('OPENAI_API_KEY')

# Social media API keys
SOCIAL_AUTH_FACEBOOK_KEY = env('FACEBOOK_APP_ID')
SOCIAL_AUTH_FACEBOOK_SECRET = env('FACEBOOK_APP_SECRET')
SOCIAL_AUTH_TWITTER_KEY = env('TWITTER_API_KEY')
SOCIAL_AUTH_TWITTER_SECRET = env('TWITTER_API_SECRET')
SOCIAL_AUTH_LINKEDIN_KEY = env('LINKEDIN_CLIENT_ID')
SOCIAL_AUTH_LINKEDIN_SECRET = env('LINKEDIN_CLIENT_SECRET')
SOCIAL_AUTH_INSTAGRAM_KEY = env('INSTAGRAM_CLIENT_ID')
SOCIAL_AUTH_INSTAGRAM_SECRET = env('INSTAGRAM_CLIENT_SECRET')

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}

# List of human tasks (commented)
"""
Human tasks:
1. Review and update the SECRET_KEY setting to ensure it's properly secured and not hardcoded
2. Verify that all necessary environment variables are properly set in the production environment
3. Review and adjust the CORS_ALLOWED_ORIGINS setting for production use
4. Ensure that DEBUG is set to False in the production environment
5. Review and potentially customize the LOGGING configuration for production use
6. Verify that all required third-party API keys and secrets are properly set and secured
"""