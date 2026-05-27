import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createChat = async (userId: string, title: string) => {
  return prisma.chat.create({
    data: {
      userId,
      title,
    },
  });
};

export const saveMessage = async (
  chatId: string,
  role: "user" | "ai",
  content: string
) => {
  return prisma.message.create({
    data: {
      chatId,
      role,
      content,
    },
  });
};

export const getMessages = async (chatId: string) => {
  return prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
  });
};