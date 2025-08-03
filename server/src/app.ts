import express, { json } from "express"
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./db";
import todoRoutes from "./routes/todo";

dotenv.config({
  path: '.env',
});

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(json());

app.use(todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});