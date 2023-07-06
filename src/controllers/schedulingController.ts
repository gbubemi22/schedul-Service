import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";

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
      createdById,
      editedById,
      vehicleId,
    } = req.body;

    try {
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

      return res.status(StatusCodes.CREATED).json(newSchedule);
    } catch (error) {
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
          editedById: checkAdminId.id,
          createdById: checkAdminId.id,
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
    const { vehicleId } = req.params;

    try {
      const schedules = await prisma.schedule.findMany({
        where: { vehicleId: vehicleId }, // Update the where clause
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
    const { driverId } = req.params;

    try {
      const schedules = await prisma.schedule.findMany({
        where: { driverId: driverId },
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
