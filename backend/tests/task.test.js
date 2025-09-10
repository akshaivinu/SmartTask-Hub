import request from "supertest";
import app from "../server.js"; // your Express app exported from server.js
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { DBI_URI } from "../config/config.js";
import { generateToken } from "../utils/logger.util.js";
import cookie from "cookie";

jest.setTimeout(10000);

describe("Task API endpoints", () => {
  let taskId;
  let authToken;
  const baseUrl = "/api/v1/tasks";
  beforeAll(async () => {
    await mongoose.connect(DBI_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    const hashedPass = await bcrypt.hash("12345678", 10);
    await User.create({
      name: "vinu",
      email: "vinu@gmail.com",
      password: hashedPass,
    });
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "vinu@gmail.com", password: "12345678" });
    const cookies = res.headers["set-cookie"];
    if (!cookies) return console.log("No cookies found");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("jwt="));
    if (!tokenCookie) return console.log("No token cookie found");
    const parsed = cookie.parse(tokenCookie);
    const token = parsed.jwt;
    authToken = token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new task", async () => {
    const newTask = {
      title: "Test Task",
      description: "Test description",
      status: "pending",
      dueDate: "2025-12-31",
    };
    const res = await request(app)
      .post(baseUrl)
      .set("Cookie", [`jwt=${authToken}`])
      .send(newTask)
      .expect("Content-Type", /json/)
      .expect(201);

    

    expect(res.body.message).toBe("Task created successfully");
    expect(res.body.data.title).toBe(newTask.title);
    taskId = res.body.data._id;
  });

  it("should get all tasks", async () => {
    console.log("authToken:", authToken);
    
    const res = await request(app)
      .get(baseUrl)
      .set("Cookie", [`jwt=${authToken}`])
      .expect("Content-Type", /json/)
      .expect(200);
      
    console.log("authToken:", authToken);
    

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should get task by ID", async () => {
    const res = await request(app)
      .get(`${baseUrl}/${taskId}`)
      .set("Cookie", [`jwt=${authToken}`])
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.data._id).toBe(taskId);
  });

  it("should update a task by ID", async () => {
    const updatedTask = {
      title: "Updated Test Task",
      description: "Updated description",
      status: "in-progress",
      dueDate: "2026-01-15",
    };

    const res = await request(app)
      .put(`${baseUrl}/${taskId}`)
      .set("Cookie", [`jwt=${authToken}`])
      .send(updatedTask)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toBe("Task updated successfully");
    expect(res.body.data.title).toBe(updatedTask.title);
    expect(res.body.data.status).toBe(updatedTask.status);
  });

  it("should delete a task by ID", async () => {
    const res = await request(app)
      .delete(`${baseUrl}/${taskId}`)
      .set("Cookie", [`jwt=${authToken}`])
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toBe("Task deleted successfully");
  });

  it("should return 404 for deleted task on get by ID", async () => {
    const res = await request(app)
      .get(`${baseUrl}/${taskId}`)
      .set("Cookie", [`jwt=${authToken}`])
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.message).toBe("Task not found");
  });
});
