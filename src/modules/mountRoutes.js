import notesRoutes from "./notes/routes/notesRoutes.js";
import authRoutes from "./auth/routes/authRoute.js";
import userRouter from "./users/routes/userRoute.js";

const mountRoutes = (app) => {
  app.use("/api/v1/notes", notesRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRouter);
};

export default mountRoutes;
