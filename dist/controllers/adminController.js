"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authValidation_1 = require("../helpers/authValidation");
const passwordValidator_1 = __importDefault(require("../utils/passwordValidator"));
// Resgister a driver 
const adminAuthController = {
    createAdmin: async (req, res) => {
        const { error } = authValidation_1.AdminSchema.validate(req.body);
        if (error) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Invalid request body",
                error: error.details[0].message,
            });
        }
        const { email, password, number, full_name } = req.body;
        const emailAlreadyExists = await prisma_1.default.admin.findUnique({
            where: { email: email },
        });
        if (emailAlreadyExists) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                message: "Email already exists",
            });
        }
        // Check if number is unique
        const numberAlreadyExists = await prisma_1.default.admin.findFirst({
            where: { number },
        });
        if (numberAlreadyExists) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                message: "Number already exists",
            });
        }
        const passwordValidationResult = (0, passwordValidator_1.default)(password);
        if (typeof passwordValidationResult !== "boolean") {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(passwordValidationResult);
        }
        // Hash the password
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Create the user if password validation passes
        if (passwordValidationResult) {
            const createdUser = await prisma_1.default.admin.create({
                data: {
                    full_name,
                    email,
                    password: hashedPassword,
                    number,
                    type: "ADMIN",
                },
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: "User created successfully",
                user: {
                    id: createdUser.id,
                    email: createdUser.email,
                    number: createdUser.number,
                    type: createdUser.type,
                    createdAt: createdUser.createdAt,
                },
            });
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Invalid password",
            });
        }
    },
    loginAdmin: async (req, res) => {
        const { email, password } = req.body;
        const user = await prisma_1.default.admin.findUnique({ where: { email } });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await (0, password_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "Invalid email or password",
            });
        }
        // Generate a JWT token
        console.log(process.env.JWT_SECRET);
        const token = jsonwebtoken_1.default.sign({ userId: user.id, type: user.type }, process.env.JWT_SECRET || "", // Provide a default value if process.env.JWT_SECRET is undefined
        { expiresIn: "1h" });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                number: user.number,
                type: user.type,
            },
            token: token,
        });
    },
};
exports.default = adminAuthController;
