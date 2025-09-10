import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { NODE_ENV, PORT } from "./config/config.js";

import taskRoute from "./routes/task.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/auth", userRoute);

const Port = PORT || 5000;

if (NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port http://localhost:${Port}`);
    });
  });
}

export default app;
