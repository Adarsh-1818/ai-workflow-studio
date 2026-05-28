"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.forgotPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../config/prisma"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const crypto_1 = __importDefault(require("crypto"));
const email_service_1 = require("../services/email.service");
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const resetToken = crypto_1.default
            .randomBytes(32)
            .toString("hex");
        const expiry = new Date(Date.now() + 1000 * 60 * 15);
        await prisma_1.default.user.update({
            where: { email },
            data: {
                resetToken,
                resetTokenExpiry: expiry,
            },
        });
        const resetLink = `
${process.env.FRONTEND_URL}
/reset-password/${resetToken}
`;
        await (0, email_service_1.sendResetEmail)(email, resetLink);
        return res.json({
            success: true,
            message: "Reset email sent",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to send reset email",
        });
    }
};
exports.forgotPassword = forgotPassword;
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
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must contain uppercase, digit, special character and be 8+ chars",
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
