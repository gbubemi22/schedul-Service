import { Request, Response } from "express";
declare const adminAuthController: {
    createAdmin: (req: Request, res: Response) => Promise<Response>;
    loginAdmin: (req: Request, res: Response) => Promise<Response>;
};
export default adminAuthController;
