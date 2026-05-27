"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.saveMessage = exports.createChat = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createChat = async (userId, title) => {
    return prisma.chat.create({
        data: {
            userId,
            title,
        },
    });
};
exports.createChat = createChat;
const saveMessage = async (chatId, role, content) => {
    return prisma.message.create({
        data: {
            chatId,
            role,
            content,
        },
    });
};
exports.saveMessage = saveMessage;
const getMessages = async (chatId) => {
    return prisma.message.findMany({
        where: { chatId },
        orderBy: { createdAt: "asc" },
    });
};
exports.getMessages = getMessages;
