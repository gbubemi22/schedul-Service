import { Request, Response } from "express";
declare const vehicleController: {
    addVehicle: (req: Request, res: Response) => Promise<Response>;
    getOneVehicle: (req: Request, res: Response) => Promise<Response>;
    getAllVehicle: (req: Request, res: Response) => Promise<Response>;
    updateVehicle: (req: Request, res: Response) => Promise<Response>;
    deleteVehicle: (req: Request, res: Response) => Promise<Response>;
};
export default vehicleController;
