"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat.controller");
const router = express_1.default.Router();
router.post("/new", chat_controller_1.newChat);
router.post("/message", chat_controller_1.sendMessage);
router.get("/:chatId", chat_controller_1.fetchMessages);
router.delete("/:id", chat_controller_1.deleteChat);
exports.default = router;
