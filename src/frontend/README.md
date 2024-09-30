# Podcast Marketing Automation SaaS - Frontend

## Introduction

This is the frontend part of the Podcast Marketing Automation SaaS platform. It provides an intuitive user interface for podcast creators to manage, distribute, and promote their content using AI-driven tools and analytics.

## Technologies Used

- React
- TypeScript
- Redux
- TailwindCSS
- ShadCN UI

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/podcast-marketing-automation-saas.git
   cd podcast-marketing-automation-saas/src/frontend
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Copy the `.env.example` file to `.env` and update the environment variables as needed:
   ```
   cp .env.example .env
   ```

### Running the Development Server

To start the development server, run:

```
npm run start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Project Structure

The `src` directory contains the following structure:

- `components/`: Reusable React components
- `pages/`: Top-level page components
- `services/`: API service functions
- `store/`: Redux store configuration and slices
- `hooks/`: Custom React hooks
- `types/`: TypeScript type definitions
- `utils/`: Utility functions
- `styles/`: Global styles and Tailwind CSS configuration
- `__tests__/`: Test files

## Available Scripts

In the project directory, you can run:

- `npm start` or `yarn start`: Runs the app in development mode
- `npm test` or `yarn test`: Launches the test runner
- `npm run build` or `yarn build`: Builds the app for production
- `npm run lint` or `yarn lint`: Runs ESLint to check for code quality issues
- `npm run format` or `yarn format`: Formats the code using Prettier

## Testing

To run the test suite, use the following command:

```
npm test
# or
yarn test
```

## Building for Production

To create a production build, run:

```
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Docker

A Dockerfile is provided for containerizing the frontend application. To build and run the Docker container:

```
docker build -t podcast-frontend .
docker run -p 3000:80 podcast-frontend
```

## Contributing

Please read our [Contributing Guidelines](../../CONTRIBUTING.md) before submitting pull requests or opening issues.

## License

This project is licensed under the [MIT License](../../LICENSE).

```

Human Tasks:

```markdown
# Human Tasks

The following tasks need to be completed by a human:

## Required Tasks:
- Review and update the README content to ensure it accurately reflects the current state of the frontend project
- Add any project-specific setup instructions or configuration details
- Include information about environment variables and how to set them up

## Optional Tasks:
- Add contact information or links to additional resources (e.g., documentation, issue tracker)