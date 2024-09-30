# Database Module

## Overview

The Database Module is a crucial component of the Podcast Marketing Automation SaaS platform. It provides a robust and efficient interface for managing data storage, retrieval, and manipulation. This module is designed to work seamlessly with PostgreSQL, offering a high-performance solution for handling various data entities related to podcasts, episodes, transcripts, marketing content, and analytics.

## Module Structure

The Database Module is organized into several submodules:

1. **config**: Contains configuration files for database setup and connection pooling.
2. **models**: Defines the data models representing various entities in the system.
3. **utils**: Provides utility functions for database operations and migrations.
4. **schemas**: Defines the structure and validation rules for data objects.

## Configuration

To configure the database connection, follow these steps:

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables:

```
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

3. Ensure that the `config/database.py` file is properly set up to read these environment variables.

## Models

The Database Module includes the following models:

1. **User**: Represents platform users (e.g., podcast creators, collaborators).
2. **Podcast**: Stores information about podcasts.
3. **Episode**: Contains details about individual podcast episodes.
4. **Transcript**: Stores transcriptions of podcast episodes.
5. **MarketingContent**: Represents generated marketing content for episodes.
6. **SocialMediaPost**: Tracks social media posts related to podcast promotion.
7. **Analytics**: Stores analytics data for podcasts and episodes.

## Utilities

The `utils` submodule provides several helpful functions:

- `connection.py`: Manages database connections and transactions.
- `query_builder.py`: Offers a fluent interface for building SQL queries.
- `migrations.py`: Handles database schema migrations.

## Schemas

The `schemas` submodule defines Pydantic models for data validation and serialization. These schemas ensure data integrity and provide a clear interface for interacting with the database models.

## Migrations

To run database migrations:

1. Ensure you're in the `src/database` directory.
2. Run the following command:

```
python -m alembic upgrade head
```

This will apply all pending migrations to your database.

## Usage Examples

Here's a basic example of how to use the Database Module to create a new podcast:

```python
from database.models import Podcast
from database.utils.connection import get_db_session

async with get_db_session() as session:
    new_podcast = Podcast(
        title="My Awesome Podcast",
        description="A podcast about awesome things",
        user_id=1
    )
    session.add(new_podcast)
    await session.commit()
```

## Best Practices

1. Always use asynchronous database operations to ensure optimal performance.
2. Utilize the provided utility functions for database operations instead of writing raw SQL queries.
3. Keep the database schema up-to-date by creating and applying migrations for any model changes.
4. Use appropriate indexing on frequently queried fields to improve query performance.
5. Implement proper error handling and transaction management in your database operations.

## Troubleshooting

If you encounter issues with the Database Module, try the following:

1. Verify that your database connection settings are correct in the `.env` file.
2. Ensure that the PostgreSQL server is running and accessible.
3. Check the application logs for any specific error messages.
4. Verify that all required dependencies are installed (see `requirements.txt`).
5. If you're having migration issues, try running `alembic history` to see the current migration state.

For persistent issues, please contact the development team or open an issue in the project repository.

<!-- TODO: Review and update the README content to ensure it accurately reflects the current state of the database module -->
<!-- TODO: Add any specific setup instructions or configuration details for the database -->