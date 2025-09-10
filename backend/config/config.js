import { config } from "dotenv";


config();

export const { DBI_URI, PORT, JWT_SECRET, NODE_ENV } = process.env;