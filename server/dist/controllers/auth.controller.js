"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../config/prisma"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists',
        });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    const token = (0, generateToken_1.default)(user.id);
    res.status(201).json({
        token,
        user,
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(400).json({
            message: 'Invalid credentials',
        });
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: 'Invalid credentials',
        });
    }
    const token = (0, generateToken_1.default)(user.id);
    res.json({ token, user });
};
exports.login = login;
