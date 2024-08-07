// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Third-Party Middleware
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

// Core Dependencies and Libraries
import express from "express";
import mongoose from "mongoose";

// Importing Routes
import authRoute from "./routes/auth.route";

// Configuration
import {
  corsOptions,
  expressSessionOptions,
} from "./constant/optionObj/optionObj";
import { OurErr } from "./utils/error/errorClass";

// Environment variable
const cookieSecret = process.env.COOKIE_SECRET;
const mongodbUrl = process.env.MONGODB_URL || "";

// Initialize Express App
const app = express();
const port = 3000;

// Database Connection
mongoose
  .connect(mongodbUrl)
  .then(() => console.log("connected to the server🍀"))
  .catch((err) => {
    throw new OurErr({
      status: 500,
      message: `Server not connected🐞 ${err}`,
      forFrontend: true,
    });
  });

// Middleware Configuration
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(cookieSecret));
app.use(expressSession(expressSessionOptions));
app.use(express.json());

//Routes prefix
app.use("/auth", authRoute);
// app.use("/api", portalRoute);

// Error Handling Middleware
interface CustomError {
  status?: number;
  message?: string;
  forFrontend?: boolean;
}
app.use(
  (
    err: CustomError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { status = 500, message = "some error occured", forFrontend } = err;

    if (forFrontend) res.status(status).json({ message: message });
    console.log("🐞 Err Middlaware:", message);
    next();
  }
);

// Start Server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
