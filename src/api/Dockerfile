# Set base image to Python 3.9 slim-buster
FROM python:3.9-slim-buster

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Run database migrations
RUN python manage.py migrate

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port 8000
EXPOSE 8000

# Set the entrypoint command
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]

# Human tasks (commented)
# TODO: Review and adjust system dependencies if needed (Optional)
# TODO: Ensure all required environment variables are properly set in the deployment environment (Required)