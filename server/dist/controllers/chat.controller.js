"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChat = exports.fetchMessages = exports.sendMessage = exports.newChat = void 0;
const chat_service_1 = require("../services/chat.service");
const prisma_1 = __importDefault(require("../config/prisma"));
const newChat = async (req, res) => {
    const { userId, title } = req.body;
    const chat = await (0, chat_service_1.createChat)(userId, title);
    res.json(chat);
};
exports.newChat = newChat;
const sendMessage = async (req, res) => {
    const { chatId, prompt } = req.body;
    await (0, chat_service_1.saveMessage)(chatId, "user", prompt);
    // MOCK AI RESPONSE (for now)
    const aiResponse = `You said: ${prompt}`;
    await (0, chat_service_1.saveMessage)(chatId, "ai", aiResponse);
    res.json({ response: aiResponse });
};
exports.sendMessage = sendMessage;
const fetchMessages = async (req, res) => {
    const chatId = req.params.chatId;
    const messages = await (0, chat_service_1.getMessages)(chatId);
    res.json(messages);
};
exports.fetchMessages = fetchMessages;
const deleteChat = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma_1.default.message.deleteMany({
            where: {
                chatId: id,
            },
        });
        await prisma_1.default.chat.delete({
            where: {
                id,
            },
        });
        return res.json({
            success: true,
            message: "Chat deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to delete chat",
        });
    }
};
exports.deleteChat = deleteChat;
