import { Request, Response } from "express";
import { createChat, saveMessage, getMessages } from "../services/chat.service";
import prisma from '../config/prisma';

export const newChat = async (req: Request, res: Response) => {
  const { userId, title } = req.body;

  const chat = await createChat(userId, title);

  res.json(chat);
};

export const sendMessage = async (req: Request, res: Response) => {
  const { chatId, prompt } = req.body;

  await saveMessage(chatId, "user", prompt);

  // MOCK AI RESPONSE (for now)
  const aiResponse = `You said: ${prompt}`;

  await saveMessage(chatId, "ai", aiResponse);

  res.json({ response: aiResponse });
};

export const fetchMessages = async (req: Request, res: Response) => {
    const chatId = req.params.chatId as string;

  const messages = await getMessages(chatId);

  res.json(messages);
};

export const deleteChat = async (
  req: Request,
  res: Response
) => {

  const id = req.params.id as string;

  try {

    await prisma.message.deleteMany({
      where: {
        chatId: id,
      },
    });

    await prisma.chat.delete({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: "Chat deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to delete chat",
    });

  }
};