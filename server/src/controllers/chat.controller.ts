import { Request, Response } from "express";
import { createChat, saveMessage, getMessages } from "../services/chat.service";

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