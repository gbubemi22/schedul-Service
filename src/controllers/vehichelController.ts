import { Request, Response } from "express";
import prisma from "../DB/prisma";

import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const vehicleController = {
  addVehicle: async (req: Request, res: Response): Promise<Response> => {
    const { vehicle_name, vehicle_type, image, status } = req.body;

    const file = req.file; // Assuming the image file is uploaded as 'file' in the request
    

    if (!vehicle_name || !vehicle_type || !status || !file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Please provide all the required details and upload an image.",
      });
    }
       // Upload image to Cloudinary
       const uploadedImage = await cloudinary.uploader.upload(file.path);


    const newVehicle = await prisma.vehicle.create({
      data: {
        image: uploadedImage.secure_url,
        vehicle_name,
        vehicle_type,
        status
      },
    });
    return res.status(StatusCodes.CREATED).json(newVehicle);
  },
  getOneVehicle: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: id,
      },
    });
    if (!vehicle) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ` vehicle not found` });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: ` vehicle`, vehicle: vehicle });
  },

  getAllVehicle: async (req: Request, res: Response): Promise<Response> => {
    const vehicles = await prisma.vehicle.findMany();

    if (vehicles.length == 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `vehicles not found` });

    return res.status(StatusCodes.OK).json(vehicles);
  },

  updateVehicle: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const updatedVehicle = await prisma.vehicle.update({
      where: {
        id: id,
      },
      data: req.body,
    });

    if (!updatedVehicle) {
      return res.status(StatusCodes.NOT_FOUND).json(`Vehicle not found`);
    }

    return res.status(StatusCodes.OK).json({
      message: "Vehicle updated successfully.",
      updatedVehicle,
    });
  },

  deleteVehicle: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const deletedVehicle = await prisma.vehicle.delete({
      where: {
        id: id,
      },
    });

    if (!deletedVehicle) {
      return res.status(StatusCodes.NOT_FOUND).json(`Vehicle not found`);
    }

    return res.status(StatusCodes.OK).json({
      message: "Vehicle deleted successfully.",
    });
  },

  add:async() {
    
  }
};

export default vehicleController;
