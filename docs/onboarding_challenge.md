# Onboarding Challenge: Profile Picture Upload

## Overview
Extend the user management microservice to support profile picture uploads. This challenge tests your ability to handle file uploads, implement validation, and integrate with existing authentication and data models.

## Requirements

### Core Functionality
1. Add a new endpoint `PUT /api/users/profile/picture` for uploading profile pictures
2. Implement file validation:
   - Accept only JPG, PNG, and GIF formats
   - Maximum file size: 5MB
   - Minimum dimensions: 100x100 pixels
3. Store uploaded images in a temporary folder (`/uploads`)
4. Update user profile with the image URL
5. Handle cleanup of old profile pictures

### Technical Requirements
1. Use existing authentication middleware
2. Implement file validation using Zod
3. Add proper error handling for all edge cases
4. Write unit tests for the new functionality
5. Update API documentation

### Edge Cases to Handle
- Invalid file types
- Files exceeding size limit
- Corrupted image files
- Missing files in request
- Failed file system operations
- Concurrent uploads
- Cleanup of old profile pictures

## Implementation Guide

### 1. Update User Model
Add `profilePicture` field to the User model in `prisma/schema.prisma`:
```prisma
model User {
  // ... existing fields ...
  profilePicture String?
}
```

### 2. Create File Upload Middleware
Create a new middleware in `src/middleware/upload.middleware.ts` to handle file uploads using multer.

### 3. Add Validation Schema
Extend the user model in `src/models/user.model.ts` to include profile picture validation.

### 4. Update User Service
Add methods in `src/services/user.service.ts` for handling profile picture operations.

### 5. Add Controller Method
Implement the upload handler in `src/controllers/user.controller.ts`.

### 6. Write Tests
Create test cases in `tests/unit/user.test.ts` for the new functionality.

## Test Scaffold
```typescript
describe('Profile Picture Upload', () => {
  it('should successfully upload and update profile picture', async () => {
    // Test implementation here
  });
});
```

## Time Allocation
- Setup and planning: 15 minutes
- Core implementation: 45 minutes
- Testing and edge cases: 30 minutes

## Success Criteria
1. All validation rules are implemented
2. Edge cases are properly handled
3. Tests pass with good coverage
4. Code follows existing patterns and style
5. Documentation is updated

## Tools Available
- Zod for validation
- JWT for authentication
- Express for routing
- Jest for testing
- Prisma for database operations

## Getting Started
1. Review the existing codebase
2. Plan your implementation
3. Create necessary directories and files
4. Implement the feature
5. Write and run tests
6. Update documentation

## Submission
1. Complete the implementation
2. Run all tests
3. Update README.md with new endpoint documentation
4. Create a pull request with your changes 