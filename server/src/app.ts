import express, { json } from "express"
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./db";
import todoRoutes from "./routes/todo";
import userRoutes from "./routes/user";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config({
  path: '.env',
});

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(json());

app.use(cookieParser());

app.use(userRoutes);
app.use(todoRoutes);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});