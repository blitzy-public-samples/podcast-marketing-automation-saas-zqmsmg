# Podcast Marketing Automation SaaS - API Backend

## Introduction

This is the API backend for the Podcast Marketing Automation SaaS platform. It provides a robust and scalable backend infrastructure to support the management, distribution, and promotion of podcast content. The API is built using Django and Django REST Framework, offering a wide range of features to streamline the podcast production and marketing workflow.

## Technologies Used

- Django 4.2+
- Django REST Framework 3.14+
- PostgreSQL 14+
- Celery 5.2+
- Redis 6.2+
- Docker
- AWS S3 (for audio file storage)
- Google Cloud Speech-to-Text API
- OpenAI GPT-3 API
- Various social media APIs (Facebook, LinkedIn, Twitter, Instagram)

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Python 3.9+
- Docker and Docker Compose
- PostgreSQL 14+
- Redis 6.2+

### Installation

1. Clone the repository:
   ```
   git clone <repository_url>
   cd src/api
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Copy the `.env.example` file to `.env` and update the environment variables:
   ```
   cp .env.example .env
   ```

5. Run database migrations:
   ```
   python manage.py migrate
   ```

6. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

### Running the Application

1. Start the Django development server:
   ```
   python manage.py runserver
   ```

2. In a separate terminal, start the Celery worker:
   ```
   celery -A config worker -l info
   ```

3. Access the API at `http://localhost:8000/api/`
4. Access the admin interface at `http://localhost:8000/admin/`

## Project Structure

The API backend follows a modular structure with the following main directories:

- `apps/`: Contains Django apps for different features (authentication, podcasts, episodes, etc.)
- `config/`: Project configuration files
- `middleware/`: Custom middleware for JWT authentication and logging
- `services/`: External service integrations (transcription, content generation, etc.)
- `tasks/`: Celery tasks for background processing
- `utils/`: Utility functions and classes

## API Documentation

For detailed API documentation, please refer to the Swagger UI available at `/api/docs/` when running the server locally. This interactive documentation provides a comprehensive overview of all available endpoints, request/response formats, and authentication requirements.

## Testing

To run the test suite, use the following command:

```
python manage.py test
```

For more detailed test coverage information, you can use the `coverage` tool:

```
coverage run manage.py test
coverage report
```

## Deployment

The API backend can be deployed using Docker. A `Dockerfile` is provided in the root directory. To build and run the Docker image:

```
docker build -t podcast-marketing-api .
docker run -p 8000:8000 podcast-marketing-api
```

For production deployment, please refer to the infrastructure documentation for detailed instructions on setting up the entire stack using AWS services.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes and commit them (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Create a new Pull Request

Please ensure that your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Pending Human Tasks

- [ ] Review and update the README content to ensure it accurately reflects the current state of the project
- [ ] Add detailed API documentation or link to external documentation
- [ ] Include information about environment variables and configuration
- [ ] Add troubleshooting section for common issues (Optional)