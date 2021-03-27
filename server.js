import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import app from "./app.js";
import Robot from "./models/robot.js";
import dotenv from "dotenv";

// Read .env file for secrets
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

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
    socket.user = valid_robot._id;
    next();
  }
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
    Robot.findByIdAndUpdate(
      socket.user,
      {
        state: {
          connected: false,
        },
      },
      function (err, res) {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  socket.on("robot_detail", async (data) => {
    console.log(data);
    Robot.findByIdAndUpdate(socket.user, { state: data }, function (err, res) {
      if (err) {
        console.log(err);
      }
    });
  });
});

server.listen(2000, () => {
  console.log(`Example app listening at http://localhost:2000`);
});
