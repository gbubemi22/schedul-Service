"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const scheduleController = {
    createSchedule: async (req, res) => {
        const { service, cliant, start_Date, end_Date, pickuploaction, dropofflocation, note, adminId, driverId, companyId, createdById, editedById, vehicleId, } = req.body;
        try {
            const newSchedule = await prisma_1.default.schedule.create({
                data: {
                    service,
                    cliant,
                    start_Date,
                    end_Date,
                    pickuploaction,
                    dropofflocation,
                    note,
                    adminId,
                    vehicleId,
                    driver: { connect: { id: driverId } },
                    createdById,
                    editedById,
                    company: { connect: { id: companyId } },
                    createdBy: createdById,
                    editedBy: editedById,
                    Vehicle: { connect: { id: vehicleId } },
                },
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(newSchedule);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to create schedule" });
        }
    },
    getSchedule: async (req, res) => {
        const { scheduleId } = req.params;
        try {
            const schedule = await prisma_1.default.schedule.findUnique({
                where: { id: scheduleId },
                include: {
                    driver: true,
                    company: true,
                },
            });
            if (!schedule) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: "Schedule not found" });
            }
            return res.status(http_status_codes_1.StatusCodes.OK).json(schedule);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to get schedule" });
        }
    },
    getAllSchedules: async (req, res) => {
        try {
            const schedules = await prisma_1.default.schedule.findMany({
                include: {
                    driver: true,
                    company: true,
                },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json(schedules);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to get schedules" });
        }
    },
    updateSchedule: async (req, res) => {
        const { scheduleId } = req.params;
        const { adminId, service, cliant, start_Date, end_Date, pickuploaction, dropofflocation, note, driverId, companyId, editedById, createdById, } = req.body;
        try {
            const checkAdminId = await prisma_1.default.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!checkAdminId) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ message: "Admin not found" });
            }
            const updatedSchedule = await prisma_1.default.schedule.update({
                where: { id: scheduleId },
                data: {
                    adminId,
                    service,
                    cliant,
                    start_Date,
                    end_Date,
                    pickuploaction,
                    dropofflocation,
                    note,
                    editedById: checkAdminId.id,
                    createdById: checkAdminId.id,
                    driver: { connect: { id: driverId } },
                    company: { connect: { id: companyId } },
                },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json(updatedSchedule);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to update schedule" });
        }
    },
    deleteSchedule: async (req, res) => {
        const { scheduleId } = req.params;
        try {
            await prisma_1.default.schedule.delete({ where: { id: scheduleId } });
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to delete schedule" });
        }
    },
    getSchedulesByVehicle: async (req, res) => {
        const { vehicleId } = req.params;
        try {
            const schedules = await prisma_1.default.schedule.findMany({
                where: { vehicleId: vehicleId },
                include: { driver: true, company: true },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json(schedules);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to get schedules by vehicle" });
        }
    },
    getSchedulesByDriver: async (req, res) => {
        const { driverId } = req.params;
        try {
            const schedules = await prisma_1.default.schedule.findMany({
                where: { driverId: driverId },
                include: { company: true },
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json(schedules);
        }
        catch (error) {
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to get schedules by driver" });
        }
    },
};
exports.default = scheduleController;
