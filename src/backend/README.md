# Podcast Marketing Automation SaaS - Backend

This is the backend component of the Podcast Marketing Automation SaaS platform. It is built using Django and provides RESTful APIs for managing podcasts, episodes, transcripts, marketing content, and analytics.

## Prerequisites

- Python 3.9+
- PostgreSQL
- Redis

## Setup

1. Clone the repository
2. Navigate to the backend directory: `cd src/backend`
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - Linux/macOS: `source venv/bin/activate`
   - Windows: `venv\Scripts\activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Copy `.env.example` to `.env` and update the environment variables
7. Run database migrations: `python manage.py migrate`
8. Create a superuser: `python manage.py createsuperuser`
9. Start the development server: `python manage.py runserver`

## Project Structure

- apps/ - Django applications
- config/ - Project configuration files
- middleware/ - Custom middleware
- services/ - External service integrations
- tasks/ - Celery tasks
- utils/ - Utility functions and classes

## API Documentation

API documentation is available at `/api/docs/` when the server is running.

## Running Tests

To run the test suite, use the following command:

```
python manage.py test
```

## Docker

A Dockerfile is provided for containerization. To build and run the Docker container, use the following commands:

```
docker build -t podcast-backend .
docker run -p 8000:8000 podcast-backend
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Human Tasks

The following tasks are pending and require human attention:

1. Add specific API endpoint documentation or link to API documentation tool (Required)
2. Include information about environment variables needed for the application (Required)
3. Add troubleshooting section for common issues (Optional)
4. Include information about the CI/CD pipeline and deployment process (Optional)