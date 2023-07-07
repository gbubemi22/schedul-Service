"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSchema = exports.DriverSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.DriverSchema = joi_1.default.object({
    full_name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    number: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.AdminSchema = joi_1.default.object({
    full_name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    number: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
