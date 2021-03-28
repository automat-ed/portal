import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import app from "./app.js";
import Robot from "./models/robot.js";
import dotenv from "dotenv";
import robot from "./models/robot.js";

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

  if (robot_key === "frontend") {
    next();
  } else {
    const valid_robot = await Robot.findOne({ key: robot_key });

    if (!valid_robot) {
      const err = new Error("Not authorized");
      err.data = { content: "Robot is not authorized to connect to Portal." };
      next(err);
    } else {
      socket.user = valid_robot._id;
      next();
    }
  }
});

let robot_mapping = {};

io.on("connection", (socket) => {
  console.log("connected");

  if (socket.user) {
    robot_mapping = {
      ...robot_mapping,
      [socket.user]: socket.id,
    };

    socket.on("disconnect", () => {
      console.log("disconnected");
      Robot.findByIdAndUpdate(
        socket.user,
        {
          state: {
            connected: false,
            battery: null,
            state: "Off",
            gps: {
              lat: null,
              lng: null,
            },
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
      Robot.findByIdAndUpdate(
        socket.user,
        { state: data },
        function (err, res) {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  } else {
    socket.on("start", async (data) => {
      io.to(robot_mapping[data.key]).emit("start", {});
    });

    socket.on("emergency", async (data) => {
      io.to(robot_mapping[data.key]).emit("emergency", {});
    });
  }
});

server.listen(2000, () => {
  console.log(`Example app listening at http://localhost:2000`);
});
