"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../DB/prisma"));
const http_status_codes_1 = require("http-status-codes");
const date_fns_1 = require("date-fns");
const getSchedulesByDayWeekMonth = async (req, res) => {
    const { day, week, month } = req.query;
    try {
        let schedules = [];
        if (day) {
            const date = new Date(day);
            schedules = await prisma_1.default.schedule.findMany({
                where: {
                    start_Date: {
                        gte: date,
                        lt: new Date(date),
                    },
                },
            });
        }
        else if (week) {
            const startOfWeek = new Date(week);
            const endOfWeek = (0, date_fns_1.addDays)(startOfWeek, 6);
            schedules = await prisma_1.default.schedule.findMany({
                where: {
                    start_Date: {
                        gte: startOfWeek,
                        lt: endOfWeek,
                    },
                },
            });
        }
        else if (month) {
            const startOfMonth = new Date(month);
            const endOfMonth = (0, date_fns_1.addMonths)(startOfMonth, 1);
            schedules = await prisma_1.default.schedule.findMany({
                where: {
                    start_Date: {
                        gte: startOfMonth,
                        lt: endOfMonth,
                    },
                },
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
