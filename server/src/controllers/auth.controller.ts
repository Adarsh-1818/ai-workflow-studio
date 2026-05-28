import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import prisma from '../config/prisma';
import generateToken from '../utils/generateToken';
import crypto from "crypto";
import { sendResetEmail } from "../services/email.service";

export const forgotPassword = async (
  req: Request,
  res: Response
) => {

  try {

    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    const expiry = new Date(
      Date.now() + 1000 * 60 * 15
    );

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry: expiry,
      },
    });

    const resetLink = `
${process.env.FRONTEND_URL}
/reset-password/${resetToken}
`;

    await sendResetEmail(
      email,
      resetLink
    );

    return res.json({
      success: true,
      message: "Reset email sent",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to send reset email",
    });

  }

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