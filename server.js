import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import app from "./app.js";
import Robot from "./models/robot.js";
import dotenv from "dotenv";

// Read .env file for secrets
dotenv.config()

// MongoDB Connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Initialize socket.io server
const server = createServer(app);
const io = new Server(server);

io.use(async (socket, next) => {
  const robot_key = socket.handshake.headers.secret;
  const valid_robot = await Robot.findOne({ key: robot_key });

  if (!valid_robot) {
    const err = new Error("Not authorized");
    err.data = { content: "Robot is not authorized to connect to Portal." };
    next(err);
  } else {
    next();
  }
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("robot_detail", (data) => {
    console.log(data);
  });
});

server.listen(2000, () => {
  console.log(`Example app listening at http://localhost:2000`);
});
