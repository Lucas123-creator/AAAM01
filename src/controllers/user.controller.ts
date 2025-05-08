import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { userSchema, loginSchema, updateUserSchema } from '../models/user.model';
import jwt from 'jsonwebtoken';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const userData = userSchema.parse(req.body);
      const user = await userService.createUser(userData);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      await userService.setUserSession(user.id, token);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'Invalid user data' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await userService.findUserByEmail(email);
      
      if (!user || !(await userService.validatePassword(user, password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      await userService.updateLastLogin(user.id);
      await userService.setUserSession(user.id, token);

      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'Invalid login data' });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const user = await userService.findUserByEmail(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const userData = updateUserSchema.parse(req.body);
      const user = await userService.updateUser(userId, userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Invalid update data' });
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      await userService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete profile' });
    }
  }
} 