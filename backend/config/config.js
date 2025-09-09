import { config } from "dotenv";


config();

export const { DBI_URI, PORT } = process.env;