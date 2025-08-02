import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { AppError } from "./utils/appError.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";

// Read from .env
dotenv.config();

const PORT = process.env.PORT;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
if (!PORT || !USERNAME || !PASSWORD) {
  console.log("Error reading for .env");
  process.exit(1);
}

// Init express app
const app = express();

// Connect to DB
const initMongo = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.7bnbld9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting database");
    process.exit(1);
  }
};

initMongo();

// Global middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Global error handling middleware
app.all("*", (req, _res, next) => {
  return next(new AppError(`Route ${req.originalUrl} not found.`, 404));
});
app.use(globalErrorHandler);

// Start listening
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server:", err.message);
    process.exit(1);
  }
  console.log("Server listening on PORT:", PORT);
});
