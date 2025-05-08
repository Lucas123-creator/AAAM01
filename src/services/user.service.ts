import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import bcrypt from 'bcrypt';
import { UserInput, UpdateUserInput } from '../models/user.model';

const prisma = new PrismaClient();
const redis = createClient({
  url: process.env.REDIS_URL
});

export class UserService {
  async createUser(userData: UserInput) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(id: string, userData: UpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  async validatePassword(user: any, password: string) {
    return bcrypt.compare(password, user.password);
  }

  async updateLastLogin(id: string) {
    return prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });
  }

  async setUserSession(userId: string, token: string) {
    await redis.set(`session:${token}`, userId, {
      EX: 24 * 60 * 60, // 24 hours
    });
  }

  async getUserSession(token: string) {
    return redis.get(`session:${token}`);
  }

  async clearUserSession(token: string) {
    await redis.del(`session:${token}`);
  }
} 