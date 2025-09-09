import mongoose from "mongoose"
import { DBI_URI } from "./config.js"


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DBI_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
        
    }
}