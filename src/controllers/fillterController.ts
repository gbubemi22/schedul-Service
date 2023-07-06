import { Request, Response } from 'express';
import prisma from "../DB/prisma";
import { StatusCodes } from 'http-status-codes';
import { Schedule } from '@prisma/client';



const getSchedulesByDayWeekMonth = async (req: Request, res: Response): Promise<Response> => {
     const { day, week, month } = req.params;
   
     try {
       let schedules: Schedule[] = [];
   
       if (day) {
         schedules = await prisma.schedule.findMany({
           where: {
             start_Date: {
               gte: new Date(day),
               lt: new Date(day),
             },
           },
           include: { driver: true, company: true },
         });
       } else if (week) {
         schedules = await prisma.schedule.findMany({
           where: {
             start_Date: {
               gte: new Date(week),
               lt: new Date(week),
             },
           },
           include: { driver: true, company: true },
         });
       } else if (month) {
         schedules = await prisma.schedule.findMany({
           where: {
             start_Date: {
               gte: new Date(month),
               lt: new Date(month),
             },
           },
           include: { driver: true, company: true },
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
   


