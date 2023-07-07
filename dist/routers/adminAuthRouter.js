"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminController_1 = __importDefault(require("../controllers/adminController"));
router
    .route('/admin/signup')
    .post(adminController_1.default.createAdmin);
router
    .route('/admin/login')
    .post(adminController_1.default.loginAdmin);
exports.default = router;
