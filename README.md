# React Nest Template

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ge-m-zhang/ReactNest-template)

A modern full-stack template built with React, NestJS, and TypeScript, featuring a robust component library and development tools.

## 🚀 Features

- **Frontend**

  - React with TypeScript
  - Vite for fast development and building
  - TanStack Query for data fetching
  - Recoil for state management
  - React Router for routing
  - Tailwind CSS for styling
  - Custom UI component library (@react-ui)

- **Backend**

  - NestJS with TypeScript
  - RESTful API architecture
  - Google OAuth integration
  - TypeORM for database management
  - JWT authentication
  - Optional integrations (OpenAI, AWS)

- **Development Tools**
  - PNPM for package management
  - Turborepo for monorepo management
  - ESLint and Prettier for code formatting
  - Vitest for testing
  - Storybook for component documentation

## 📦 Project Structure

```
├── apps/
│   ├── frontend/          # React frontend application
│   ├── backend/           # NestJS backend application
│   └── storybook-react-ui # Storybook for UI components
├── packages/
│   └── @react-ui/         # Shared UI component library
└── pnpm-workspace.yaml    # PNPM workspace configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PNPM (v8 or higher)

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm start

# Build all packages and applications
pnpm build
```

### Development

```bash
# Start frontend development server
pnpm --filter frontend dev

# Start backend development server
pnpm --filter backend dev

# Start Storybook
pnpm --filter storybook-react-ui dev
```

## 🔧 Backend Setup

The backend service requires some configuration before it can be used. Please refer to the [Backend README](./apps/backend/README.md) for detailed setup instructions, including:

- Required environment variables
- Google OAuth setup
- JWT configuration
- Optional feature setup (OpenAI, AWS)

## 🎨 UI Component Library

The project includes a custom UI component library (@react-ui) with the following key components:

- **Flex**: A flexible layout component with support for:

  - Direction (row, column)
  - Alignment and justification
  - Gap spacing (xs to 3xl)
  - Width and height utilities
  - Flex grow/shrink properties

- **Typography**: Text components with:

  - Multiple heading levels (h1-h6)
  - Body text variants
  - Alignment options
  - Responsive text sizing

- **Button**: Feature-rich button component with:
  - Multiple variants (contained, outlined, text)
  - Color options
  - Size variants
  - Icon support
  - Loading states

## 🔧 Configuration

### Frontend Configuration

- **Vite**: Configured for React and TypeScript
- **Tailwind**: Custom theme configuration with dark mode support
- **TypeScript**: Strict mode enabled with path aliases

### Backend Configuration

- **NestJS**: RESTful API setup with TypeORM
- **Authentication**: Google OAuth integration
- **Environment**: Configurable through .env files
- **Optional Features**: OpenAI and AWS integrations can be enabled or removed as needed

## 🧪 Testing

```bash
# Run frontend tests
pnpm --filter frontend test

# Run backend tests
pnpm --filter backend test
```

## 🐳 Docker Support

Both frontend and backend include Docker configurations for containerized deployment:

### Building Images and Running Container

```bash
# Get version from package.json
VERSION=$(node -p "require('./package.json').version")

# Build frontend image with dynamic version
docker build -f apps/frontend/Dockerfile -t frontend:${VERSION} .

# Build backend image with dynamic version
docker build -f apps/backend/Dockerfile -t backend:${VERSION} .

# Run frontend container
docker run -d --name frontend-${VERSION} -p 3000:3000 --env-file $(pwd)/apps/frontend/.env frontend:${VERSION}

# Run backend container
docker run -d --name backend-${VERSION} -p 4000:4000 --env-file $(pwd)/apps/backend/.env backend:${VERSION}
```

## 📝 License

MIT

## 🔄 Template Evolution

This template is designed to evolve with your projects and provide a consistent foundation for all your React/Nest applications.

### Component Development Workflow

- **Create project** from this template for new applications
- **Develop components** in the context of real features and use cases
- **Sync stable components** back to the template repository
- **Existing projects** receive updates via pnpm link or package versioning

### Sharing with Existing Projects

```bash
# Link local template UI library to an existing project
cd /path/to/existing-project
pnpm link /path/to/ReactNest-template/packages/@react-ui

# Or add as a dependency with a GitHub reference
pnpm add github:yourusername/ReactNest-template#main --filter @react-ui
```

## 🚀 Next Steps

When using this template for real-world applications, consider implementing:

### CI/CD Pipeline

This template is prepared for CI/CD implementation. For production applications:

- Add GitHub Actions workflows for automated testing and deployment
- Implement quality gates with test coverage requirements
- Set up staging and production environments
- Configure automated Docker image building and publishing
