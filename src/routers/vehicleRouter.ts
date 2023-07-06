import express, { Request, Response } from "express";

import multer from 'multer';
const router = express.Router();
import vehicleController from "../controllers/vehichelController";



// Set up multer storage and file filter
const storage = multer.diskStorage({});
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
     const allowedMimeTypes = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png'];
     if (!allowedMimeTypes.includes(file.mimetype)) {
          const error: any = new Error('Please provide a valid image file');
          error.code = 'LIMIT_UNEXPECTED_FILE';
          return cb(error, false);
     }
     cb(null, true);
};

// Create a multer upload instance
const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });


router
  .route("/")
  .post(upload.single('file'),vehicleController.addVehicle)
  .get(vehicleController.getAllVehicle);

router
  .route("/:id")
  .get(vehicleController.getOneVehicle)
  .patch(vehicleController.updateVehicle)
  .delete(vehicleController.deleteVehicle);

export default router;
