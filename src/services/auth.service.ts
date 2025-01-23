import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.model';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET || '', { 
    expiresIn: '1d' 
  });
};

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email }) as IUser;
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = generateToken(user._id.toString(), user.role);
  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }) as IUser;
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id.toString(), user.role);
  return { user, token };
};