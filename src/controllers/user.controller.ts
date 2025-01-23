import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';
import User from '../models/User.model';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await AuthService.registerUser(name, email, password);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error instanceof Error ? error.message : 'Login failed' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch profile' });
  }
};