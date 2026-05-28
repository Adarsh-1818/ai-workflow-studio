import express from "express";
import { newChat, sendMessage, fetchMessages, deleteChat } from "../controllers/chat.controller";

const router = express.Router();

router.post("/new", newChat);
router.post("/message", sendMessage);
router.get("/:chatId", fetchMessages);
router.delete("/:id", deleteChat);

export default router;