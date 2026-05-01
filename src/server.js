import dotenv from "dotenv";
import morgan from "morgan";
import e from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import globalError from "./middleware/error.js";
import ApiError from "./utils/apiError.js";

dotenv.config();
const port = process.env.PORT;
const app = e();
app.use(e.json()); // middleware
app.use(rateLimiter); // custom middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/notes", notesRoutes);

app.use((req, res, next) =>
  next(ApiError(`Can not find this route: ${req.originalUrl}`, 400)),
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
