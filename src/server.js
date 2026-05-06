import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import notesRoutes from "./modules/notes/routes/notesRoutes.js";
import authRoutes from "./modules/auth/routes/authRoute.js";
import userRouter from "./modules/users/routes/userRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import globalError from "./middleware/error.js";
import ApiError from "./utils/apiError.js";
import corsOptions from "./config/cors/corsOptions.js";
import swaggerSpec from "./config/swagger.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json()); // middleware
app.use(rateLimiter); // custom middleware
app.use(cors(corsOptions)); // CORS-options
app.use(cookieParser()); // CORS-options

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // swagger-documents

app.use((req, res, next) =>
  next(new ApiError(`Can not find this route: ${req.originalUrl}`, 400)),
); // Api Error Middleware

app.use(globalError); // error middleware

connectDB().then(() =>
  app.listen(port, () => console.log(`Server is running on ${port} port`)),
);

// Handle Rejections outof Express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Server shutting down");
    process.exit(1);
  });
});
