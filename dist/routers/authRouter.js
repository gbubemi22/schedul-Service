"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
router
    .route('/signup-driver')
    .post(authController_1.default.createDeriver);
router
    .route('/login-driver')
    .post(authController_1.default.loginDriver);
router
    .route('/logout')
    .get(authController_1.default.logoutUser);
exports.default = router;
