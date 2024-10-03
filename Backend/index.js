import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import connectDB from "../Backend/config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use("/api", router);

const PORT = process.env.PORT
connectDB().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
