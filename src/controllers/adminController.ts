import { Request, Response } from "express";
import prisma from "../DB/prisma";

import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/password";
import jwt from "jsonwebtoken";
import {AdminSchema} from "../helpers/authValidation";
import validatePasswordString from "../utils/passwordValidator";


// Resgister a driver 
const adminAuthController = {
  createAdmin: async (req: Request, res: Response): Promise<Response> => {
    const { error } = AdminSchema.validate(req.body);

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid request body",
        error: error.details[0].message,
      });
    }
    const { email, password, number, full_name } = req.body;
    const emailAlreadyExists = await prisma.admin.findUnique({
      where: { email: email },
    });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Email already exists",
      });
    }

    // Check if number is unique
    const numberAlreadyExists = await prisma.admin.findFirst({
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
      const createdUser = await prisma.admin.create({
        data: {
          full_name,
          email,
          password: hashedPassword,
          number,
          type: "ADMIN",
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

  loginAdmin: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await prisma.admin.findUnique({ where: { email } });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password",
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
  
};

export default adminAuthController;
