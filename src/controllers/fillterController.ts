import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { Schedule } from '@prisma/client';
import { addDays, addMonths } from 'date-fns';



const getSchedulesByDayWeekMonth = async (req: Request, res: Response): Promise<Response> => {
  const { day, week, month } = req.query as { day?: string; week?: string; month?: string };


  try {
    let schedules: Schedule[] = [];

    if (day) {
      const date = new Date(day);
      schedules = await prisma.schedule.findMany({
        where: {
          start_Date: {
            gte: date,
            lt: new Date(date),
          },
        },
      });
    } else if (week) {
      const startOfWeek = new Date(week);
      const endOfWeek = addDays(startOfWeek, 6);
      schedules = await prisma.schedule.findMany({
        where: {
          start_Date: {
            gte: startOfWeek,
            lt: endOfWeek,
          },
        },
      });
    } else if (month) {
      const startOfMonth = new Date(month);
      const endOfMonth = addMonths(startOfMonth, 1);
      schedules = await prisma.schedule.findMany({
        where: {
          start_Date: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
        },
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid filter parameters' });
    }

    return res.status(StatusCodes.OK).json(schedules);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to get schedules' });
  }
};

export default getSchedulesByDayWeekMonth;
