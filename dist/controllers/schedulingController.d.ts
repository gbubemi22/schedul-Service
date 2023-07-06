import { Request, Response } from "express";
declare const scheduleController: {
    createSchedule: (req: Request, res: Response) => Promise<Response>;
    getSchedule: (req: Request, res: Response) => Promise<Response>;
    getAllSchedules: (req: Request, res: Response) => Promise<Response>;
    updateSchedule: (req: Request, res: Response) => Promise<Response>;
    deleteSchedule: (req: Request, res: Response) => Promise<Response>;
    getSchedulesByVehicle: (req: Request, res: Response) => Promise<Response>;
    getSchedulesByDriver: (req: Request, res: Response) => Promise<Response>;
};
export default scheduleController;
