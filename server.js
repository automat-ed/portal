const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const app = require("./app");
const robot = require("./models/robot");

// Read .env file for secrets
require('dotenv').config()

// MongoDB Connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Initialize socket.io server
const server = http.createServer(app);
const io = socketIO(server);

io.use(async (socket, next) => {
  const robot_key = socket.handshake.headers.secret;
  const valid_robot = await robot.findOne({ key: robot_key });

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
});

server.listen(2000, () => {
  console.log(`Example app listening at http://localhost:2000`);
});
