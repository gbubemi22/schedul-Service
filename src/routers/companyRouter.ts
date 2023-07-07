import express, { Request, Response } from "express";

const router = express.Router();



import companyController from '../controllers/companyController';



router
.route('/')
.post(companyController.addCompany)
.get(companyController.getAllCompanies)



router
.route('/:companyId')
.get(companyController.getOneCompany)
.patch(companyController.updateCompany)
.delete(companyController.deleteCompany)


export default router