// npx mrm lint-staged
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./database/database.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `Server listening at http://localhost:${port} and running mode is ${process.env.NODE_ENV}`
  )
);
