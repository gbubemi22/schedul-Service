"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const vehicleController = {
    addVehicle: async (req, res) => {
        const { vehicle_name, vehicle_type, image, status } = req.body;
        const file = req.file; // Assuming the image file is uploaded as 'file' in the request
        if (!vehicle_name || !vehicle_type || !status || !file) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Please provide all the required details and upload an image.",
            });
        }
        // Upload image to Cloudinary
        const uploadedImage = await cloudinary_1.v2.uploader.upload(file.path);
        const newVehicle = await prisma_1.default.vehicle.create({
            data: {
                image: uploadedImage.secure_url,
                vehicle_name,
                vehicle_type,
                status
            },
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(newVehicle);
    },
    getOneVehicle: async (req, res) => {
        const { id } = req.params;
        const vehicle = await prisma_1.default.vehicle.findUnique({
            where: {
                id: id,
            },
        });
        if (!vehicle) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: ` vehicle not found` });
        }
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: ` vehicle`, vehicle: vehicle });
    },
    getAllVehicle: async (req, res) => {
        const vehicles = await prisma_1.default.vehicle.findMany();
        if (vehicles.length == 0)
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: `vehicles not found` });
        return res.status(http_status_codes_1.StatusCodes.OK).json(vehicles);
    },
    updateVehicle: async (req, res) => {
        const { id } = req.params;
        const updatedVehicle = await prisma_1.default.vehicle.update({
            where: {
                id: id,
            },
            data: req.body,
        });
        if (!updatedVehicle) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(`Vehicle not found`);
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Vehicle updated successfully.",
            updatedVehicle,
        });
    },
    deleteVehicle: async (req, res) => {
        const { id } = req.params;
        const deletedVehicle = await prisma_1.default.vehicle.delete({
            where: {
                id: id,
            },
        });
        if (!deletedVehicle) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(`Vehicle not found`);
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Vehicle deleted successfully.",
        });
    },
};
exports.default = vehicleController;
