import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
const allowedOrigin = process.env.CLIENT_URL;

// middleware
app.use(
    cors({
        origin: allowedOrigin || true,
    }),
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server started on port: ", PORT);
    });
});
