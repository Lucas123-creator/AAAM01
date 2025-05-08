# Task AAA0.1: User Management Microservice

## Overview
This microservice is designed as an onboarding task for new recruits. It provides a simplified version of the user management functionality extracted from the OFAuto-v1.2 codebase. The service handles user registration, authentication, and basic profile management.

## Features
- User registration and authentication
- Profile management
- Redis-based session handling
- PostgreSQL database integration
- RESTful API endpoints
- Input validation using Zod
- Comprehensive test suite

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Redis
- npm or yarn

## Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd task-aaa0.1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
```
DATABASE_URL="postgresql://user:password@localhost:5432/task_aaa0_1"
REDIS_URL="redis://localhost:6379"
PORT=4000
```

4. Initialize the database:
```bash
npx prisma migrate dev
```

## Running the Service
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Testing
Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/profile` - Delete user account

### Health Check
- `GET /health` - Service health status

## Project Structure
```
src/
├── controllers/    # Request handlers
├── models/        # Data models and schemas
├── services/      # Business logic
├── utils/         # Helper functions
└── index.ts       # Application entry point
```

## Development Guidelines
1. Follow TypeScript best practices
2. Write tests for new features
3. Use ESLint and Prettier for code formatting
4. Document API changes
5. Follow RESTful API design principles

## Contributing
1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## License
MIT 