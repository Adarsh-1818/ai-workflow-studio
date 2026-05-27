"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMessages = exports.sendMessage = exports.newChat = void 0;
const chat_service_1 = require("../services/chat.service");
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
