import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();

import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

//import helmet from "helmet";
const rateLimitPromise = import("express-rate-limit");
import xss from "xss-clean";

//import routes
import AuthRouter from "./routers/authRouter";
import VehicleRouter from "./routers/vehicleRouter";
import CompanyRouter from "./routers/companyRouter";
import AdminRouter from "./routers/adminAuthRouter";
import FilterRouter from "./routers/fillterRouter";
import ScheduleRouter from "./routers/scheduleRouter";

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }));

const applyRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { default: rateLimit } = await rateLimitPromise;

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  limiter(req, res, next);
};
app.use(xss());
app.use(applyRateLimiter);
//app.use(helmet());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to NoemDek App" });
});

// USE ROUTES
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/vehicles", VehicleRouter);
app.use("/api/v1/companies", CompanyRouter);
app.use("/api/v1/auth", AdminRouter);
app.use("/api/v1/filter-schedule", FilterRouter);
app.use("/api/v1/schedules", ScheduleRouter);

//ErrorHandlerMiddleware
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 7001;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Listing on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
