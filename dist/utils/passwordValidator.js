"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const validatePasswordString = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!password.match(regex)) {
        return {
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: 'Password must contain a capital letter, number, special character, and be between 8 and 20 characters long.',
        };
    }
    return true;
};
exports.default = validatePasswordString;
