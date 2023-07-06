"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const companyController_1 = __importDefault(require("../controllers/companyController"));
router
    .route('/')
    .post(companyController_1.default.addCompany)
    .get(companyController_1.default.getAllCompanies);
router
    .route('/:id')
    .get(companyController_1.default.getOneCompany)
    .patch(companyController_1.default.updateCompany)
    .delete(companyController_1.default.deleteCompany);
exports.default = router;
