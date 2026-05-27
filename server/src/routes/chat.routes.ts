import express from "express";
import { newChat, sendMessage, fetchMessages } from "../controllers/chat.controller";

const router = express.Router();

router.post("/new", newChat);
router.post("/message", sendMessage);
router.get("/:chatId", fetchMessages);

export default router;