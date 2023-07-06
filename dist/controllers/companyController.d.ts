import { Request, Response } from "express";
declare const companyController: {
    addCompany: (req: Request, res: Response) => Promise<Response>;
    getOneCompany: (req: Request, res: Response) => Promise<Response>;
    getAllCompanies: (req: Request, res: Response) => Promise<Response>;
    updateCompany: (req: Request, res: Response) => Promise<Response>;
    deleteCompany: (req: Request, res: Response) => Promise<Response>;
};
export default companyController;
