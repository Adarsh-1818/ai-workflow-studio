import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import prisma from '../config/prisma';
import generateToken from '../utils/generateToken';

export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  console.log("Password reset requested for:", email);

  return res.json({
    message: "Reset link sent successfully",
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }
  const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!strongPasswordRegex.test(password)) {
  return res.status(400).json({
    message:
      "Password must contain uppercase, digit, special character and be 8+ chars",
  });
}

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  res.status(201).json({
    token,
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }

  const token = generateToken(user.id);

  res.json({ token, user });
};