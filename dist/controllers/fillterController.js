"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const getSchedulesByDayWeekMonth = async (req, res) => {
    const { day, week, month } = req.params;
    try {
        let schedules = [];
        if (day) {
            schedules = await prisma_1.default.schedule.findMany({
                where: {
                    start_Date: {
                        gte: new Date(day),
                        lt: new Date(day),
                    },
                },
                include: { driver: true, company: true },
            });
        }
        else if (week) {
            schedules = await prisma_1.default.schedule.findMany({
                where: {
                    start_Date: {
                        gte: new Date(week),
                        lt: new Date(week),
                    },
                },
                include: { driver: true, company: true },
            });
        }
        else if (month) {
            schedules = await prisma_1.default.schedule.findMany({
                where: {
                    start_Date: {
                        gte: new Date(month),
                        lt: new Date(month),
                    },
                },
                include: { driver: true, company: true },
            });
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Invalid filter parameters' });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(schedules);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Failed to get schedules' });
    }
};
exports.default = getSchedulesByDayWeekMonth;
