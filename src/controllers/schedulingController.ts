import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";
import { log } from "console";

const scheduleController = {
  createSchedule: async (req: Request, res: Response): Promise<Response> => {
    const {
      service,
      cliant,
      start_Date,
      end_Date,
      pickuploaction,
      dropofflocation,
      note,
      adminId,
      driverId,
      companyId,
      createdBy,
      editedBy,
      vehicleId,
    } = req.body;

    try {
      const adminCheck = await prisma.admin.findUnique({
        where: { id: adminId },
      });

      if (!adminCheck) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `Admin not found` });
      }

      const newSchedule = await prisma.schedule.create({
        data: {
          service,
          cliant,
          start_Date,
          end_Date,
          pickuploaction,
          dropofflocation,
          note,
          adminId,
          createdBy: adminCheck.full_name,
          editedBy: adminCheck.full_name,
          driverId: driverId,
          companyId: companyId,
          vehicleId: vehicleId,
        },
      });

      console.log(newSchedule);

      return res.status(StatusCodes.CREATED).json(newSchedule);
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to create schedule" });
    }
  },

  getSchedule: async (req: Request, res: Response): Promise<Response> => {
    const { scheduleId } = req.params;

    try {
      const schedule = await prisma.schedule.findUnique({
        where: { id: scheduleId },
        include: {
          driver: true,
          
          company: true,
        },
      });

      if (!schedule) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Schedule not found" });
      }

      return res.status(StatusCodes.OK).json(schedule);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to get schedule" });
    }
  },

  getAllSchedules: async (req: Request, res: Response): Promise<Response> => {
    try {
      const schedules = await prisma.schedule.findMany({
        include: {
          driver: true,

          company: true,
        },
      });
      return res.status(StatusCodes.OK).json(schedules);
    } catch (error) {
      console.error(error);
      
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to get schedules" });
    }
  },

  updateSchedule: async (req: Request, res: Response): Promise<Response> => {
    const { scheduleId } = req.params;
    const {
      adminId,
      service,
      cliant,
      start_Date,
      end_Date,
      pickuploaction,
      dropofflocation,
      note,
      driverId,
      companyId,
      editedById,
      createdById,
    } = req.body;

    try {
      const checkAdminId = await prisma.admin.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!checkAdminId) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Admin not found" });
      }
      const updatedSchedule = await prisma.schedule.update({
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

          driver: { connect: { id: driverId } },
          company: { connect: { id: companyId } },
        },
      });

      return res.status(StatusCodes.OK).json(updatedSchedule);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to update schedule" });
    }
  },

  deleteSchedule: async (req: Request, res: Response): Promise<Response> => {
    const { scheduleId } = req.params;

    try {
      await prisma.schedule.delete({ where: { id: scheduleId } });
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to delete schedule" });
    }
  },

  getSchedulesByVehicle: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    try {
      const schedules = await prisma.schedule.findMany({
        where: { vehicleId: id }, // Update the where clause
        include: { driver: true, company: true },
      });

      return res.status(StatusCodes.OK).json(schedules);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to get schedules by vehicle" });
    }
  },

  getSchedulesByDriver: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    try {
      const schedules = await prisma.schedule.findMany({
        where: { driverId: id },
        include: { company: true },
      });

      return res.status(StatusCodes.OK).json(schedules);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to get schedules by driver" });
    }
  },
};

export default scheduleController;
