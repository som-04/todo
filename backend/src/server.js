import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

connectDB();

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log("server started on port: ", PORT);
});

// mongodb+srv://somyasati14_db_user:VwiDxuzAoxbbe63m@cluster0.0z5q17i.mongodb.net/?appName=Cluster0
