import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { UserController } from './controllers/user.controller';
import { authenticate } from './middleware/auth.middleware';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Initialize controllers
const userController = new UserController();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// User routes
app.post('/api/users/register', userController.register.bind(userController));
app.post('/api/users/login', userController.login.bind(userController));

// Protected routes
app.get('/api/users/profile', authenticate, userController.getProfile.bind(userController));
app.put('/api/users/profile', authenticate, userController.updateProfile.bind(userController));
app.delete('/api/users/profile', authenticate, userController.deleteProfile.bind(userController));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 