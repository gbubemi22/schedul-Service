import { Request, Response } from "express";
import prisma from "../DB/prisma";

import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/password";
import jwt from "jsonwebtoken";
import {DriverSchema} from "../helpers/authValidation";
import validatePasswordString from "../utils/passwordValidator";


// Resgister a driver 
const authController = {
  createDeriver: async (req: Request, res: Response): Promise<Response> => {
    const { error } = DriverSchema.validate(req.body);

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid request body",
        error: error.details[0].message,
      });
    }
    const { email, password, number, full_name } = req.body;
    const emailAlreadyExists = await prisma.driver.findUnique({
      where: { email: email },
    });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Email already exists",
      });
    }

    // Check if number is unique
    const numberAlreadyExists = await prisma.driver.findFirst({
      where: { number },
    });

    if (numberAlreadyExists) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Number already exists",
      });
    }

    const passwordValidationResult = validatePasswordString(password);
    if (typeof passwordValidationResult !== "boolean") {
      return res.status(StatusCodes.BAD_REQUEST).json(passwordValidationResult);
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user if password validation passes
    if (passwordValidationResult) {
      const createdUser = await prisma.driver.create({
        data: {
          full_name,
          email,
          password: hashedPassword,
          number,
          type: "DRIVER",
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: "User created successfully",
        user: {
          id: createdUser.id,
          email: createdUser.email,
          number: createdUser.number,
          type: createdUser.type,
          createdAt: createdUser.createdAt,
        },
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid password",
      });
    }
  },

  loginDriver: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await prisma.driver.findUnique({ where: { email } });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password 1" ,
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password 2",
      });
    }

    // Generate a JWT token

    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: user.id, type: user.type },
      process.env.JWT_SECRET || "", // Provide a default value if process.env.JWT_SECRET is undefined
      { expiresIn: "1h" }
    );

    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        number: user.number,
        type: user.type,
      },
      token: token,
    });
  },
  logoutUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      res.clearCookie("token");

      return res.status(StatusCodes.OK).json({
        message: "Logout successful",
      });
    } catch (error) {
      console.log(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to logout",
      });
    }
  },
};

export default authController;
