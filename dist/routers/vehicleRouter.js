"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const vehichelController_1 = __importDefault(require("../controllers/vehichelController"));
// Set up multer storage and file filter
const storage = multer_1.default.diskStorage({});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error('Please provide a valid image file');
        error.code = 'LIMIT_UNEXPECTED_FILE';
        return cb(error, false);
    }
    cb(null, true);
};
// Create a multer upload instance
const upload = (0, multer_1.default)({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });
router
    .route("/")
    .post(upload.single('file'), vehichelController_1.default.addVehicle)
    .get(vehichelController_1.default.getAllVehicle);
router
    .route("/:id")
    .get(vehichelController_1.default.getOneVehicle)
    .patch(vehichelController_1.default.updateVehicle)
    .delete(vehichelController_1.default.deleteVehicle);
exports.default = router;
