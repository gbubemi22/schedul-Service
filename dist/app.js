"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
//import helmet from "helmet";
const rateLimitPromise = Promise.resolve().then(() => __importStar(require("express-rate-limit")));
const xss_clean_1 = __importDefault(require("xss-clean"));
//import routes
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const vehicleRouter_1 = __importDefault(require("./routers/vehicleRouter"));
const companyRouter_1 = __importDefault(require("./routers/companyRouter"));
const adminAuthRouter_1 = __importDefault(require("./routers/adminAuthRouter"));
const fillterRouter_1 = __importDefault(require("./routers/fillterRouter"));
const scheduleRouter_1 = __importDefault(require("./routers/scheduleRouter"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.JWT_COOKIE));
app.use(body_parser_1.default.urlencoded({ extended: true }));
const applyRateLimiter = async (req, res, next) => {
    const { default: rateLimit } = await rateLimitPromise;
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 50,
        standardHeaders: true,
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    limiter(req, res, next);
};
app.use((0, xss_clean_1.default)());
app.use(applyRateLimiter);
//app.use(helmet());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to NoemDek App" });
});
// USE ROUTES
app.use("/api/v1/auth", authRouter_1.default);
app.use("/api/v1/vehicles", vehicleRouter_1.default);
app.use("/api/v1/companies", companyRouter_1.default);
app.use("/api/v1/auth", adminAuthRouter_1.default);
app.use("/api/v1/filter-schedule", fillterRouter_1.default);
app.use("/api/v1/schedules", scheduleRouter_1.default);
//ErrorHandlerMiddleware
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
app.use(not_found_1.default);
app.use(error_handler_1.default);
//port
const port = process.env.PORT || 7001;
const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Listing on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
