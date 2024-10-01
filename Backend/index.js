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

// CORS configuration
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000']; // Include localhost for development

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow credentials if needed
}));

app.use("/api", router);

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
