import express from "express";
import { connectDB } from "./config/db.js";

const app = express();

app.get("/", (req, res) => {
    res.send("API is running");
})

app.listen(5000, () => {
    console.log("Server is running on port http://localhost:5000");
    connectDB();
})