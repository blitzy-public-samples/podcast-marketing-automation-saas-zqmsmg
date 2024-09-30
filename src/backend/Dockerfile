FROM python:3.9-slim

# Set working directory to /app
WORKDIR /app

# Copy requirements.txt to the working directory
COPY requirements.txt .

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory to the working directory
COPY . .

# Expose port 8000 for the Django application
EXPOSE 8000

# Set the command to run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Human tasks:
# TODO: Review and update system dependencies if needed
# TODO: Consider using a production-ready web server like Gunicorn for deployment
# TODO: Implement health checks for container orchestration