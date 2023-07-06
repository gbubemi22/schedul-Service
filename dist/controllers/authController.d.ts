import { Request, Response } from "express";
declare const authController: {
    createDeriver: (req: Request, res: Response) => Promise<Response>;
    loginDriver: (req: Request, res: Response) => Promise<Response>;
    logoutUser: (req: Request, res: Response) => Promise<Response>;
};
export default authController;
