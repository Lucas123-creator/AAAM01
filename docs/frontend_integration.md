# Frontend Integration Guide

## Overview
This document provides comprehensive guidance for frontend developers integrating with the TaskAAA0.1 microservice. The service provides user management functionality with JWT authentication, session handling, and profile management.

## Base URL
```
http://localhost:4000/api
```

## Authentication Flow

### 1. Registration
```typescript
POST /users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}

// Response (201 Created)
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-03-20T12:00:00Z"
}
```

### 2. Login
```typescript
POST /users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

// Response (200 OK)
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### 3. Authentication Header
Include the JWT token in all authenticated requests:
```
Authorization: Bearer <jwt_token>
```

## API Endpoints

### User Management

#### Get Profile
```typescript
GET /users/profile
Authorization: Bearer <token>

// Response (200 OK)
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "profilePicture": "https://example.com/profile.jpg",
  "createdAt": "2024-03-20T12:00:00Z",
  "updatedAt": "2024-03-20T12:00:00Z"
}
```

#### Update Profile
```typescript
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe"
}

// Response (200 OK)
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "updatedAt": "2024-03-20T12:00:00Z"
}
```

#### Update Profile Picture
```typescript
PUT /users/profile/picture
Authorization: Bearer <token>
Content-Type: multipart/form-data

// Form data
profilePicture: <file>

// Response (200 OK)
{
  "id": "user_id",
  "profilePicture": "https://example.com/profile.jpg",
  "updatedAt": "2024-03-20T12:00:00Z"
}
```

#### Delete Account
```typescript
DELETE /users/profile
Authorization: Bearer <token>

// Response (204 No Content)
```

## Error Responses

All endpoints return errors in a consistent format:
```typescript
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

Common error codes:
- `INVALID_CREDENTIALS`: Login failed
- `UNAUTHORIZED`: Missing or invalid token
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

## Type Definitions

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
```

## Local Development Setup

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

4. Start the development server:
```bash
npm run dev
```

## Mock Data

For development without backend access, use these mock responses:

```typescript
const mockUser: User = {
  id: "mock_user_id",
  email: "mock@example.com",
  firstName: "Mock",
  lastName: "User",
  profilePicture: "https://example.com/mock.jpg",
  createdAt: "2024-03-20T12:00:00Z",
  updatedAt: "2024-03-20T12:00:00Z"
};

const mockToken = "mock.jwt.token";
```

## Best Practices

1. Always handle token expiration (401 responses)
2. Implement proper error handling for all API calls
3. Use TypeScript interfaces for type safety
4. Implement request/response interceptors for token management
5. Cache user profile data when appropriate
6. Handle file upload progress for profile pictures

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user
- Rate limit headers included in responses

## Support

For integration issues or questions:
1. Check the API documentation
2. Review error responses
3. Contact the backend team 