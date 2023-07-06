"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const companyController = {
    addCompany: async (req, res) => {
        const { company_name } = req.body;
        const newCompany = await prisma_1.default.company.create({
            data: {
                company_name,
            },
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(newCompany);
    },
    getOneCompany: async (req, res) => {
        const { companyId } = req.params;
        try {
            const company = await prisma_1.default.company.findUnique({
                where: { id: companyId },
            });
            if (!company) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: "Company not found" });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json(company);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to get company" });
        }
    },
    getAllCompanies: async (req, res) => {
        try {
            const companies = await prisma_1.default.company.findMany();
            return res.status(http_status_codes_1.StatusCodes.OK).json(companies);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to get companies" });
        }
    },
    updateCompany: async (req, res) => {
        const { companyId } = req.params;
        const { company_name } = req.body;
        try {
            const updatedCompany = await prisma_1.default.company.update({
                where: { id: companyId },
                data: { company_name },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json(updatedCompany);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to update company" });
        }
    },
    deleteCompany: async (req, res) => {
        const { companyId } = req.params;
        try {
            await prisma_1.default.company.delete({ where: { id: companyId } });
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to delete company" });
        }
    },
};
exports.default = companyController;
