import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";

const companyController = {
  addCompany: async (req: Request, res: Response): Promise<Response> => {
    const { company_name } = req.body;
    if(!req.body.company_name) {
      return res.status(StatusCodes.BAD_REQUEST).json({message:`company name required`});
    }

    const newCompany = await prisma.company.create({
      data: {
        company_name,
      },
    });

    return res.status(StatusCodes.CREATED).json(newCompany);
  },

  getOneCompany: async (req: Request, res: Response): Promise<Response> => {
    const { companyId } = req.params;

    try {
      const company = await prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!company) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Company not found" });
      }

      return res.status(StatusCodes.OK).json(company);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to get company" });
    }
  },

  getAllCompanies: async (req: Request, res: Response): Promise<Response> => {
    try {
      const companies = await prisma.company.findMany();
      return res.status(StatusCodes.OK).json(companies);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to get companies" });
    }
  },

  updateCompany: async (req: Request, res: Response): Promise<Response> => {
    const { companyId } = req.params;
    const { company_name } = req.body;

    try {
      const updatedCompany = await prisma.company.update({
        where: { id: companyId },
        data: { company_name },
      });

      return res.status(StatusCodes.OK).json(updatedCompany);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to update company" });
    }
  },

  deleteCompany: async (req: Request, res: Response): Promise<Response> => {
    const { companyId } = req.params;

    try {
      await prisma.company.delete({ where: { id: companyId } });
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to delete company" });
    }
  },
};

export default companyController;
