const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const app = require("./app");

// Read .env file for secrets
require('dotenv').config()

// MongoDB Connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Initialize socket.io server
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(2000, () => {
  console.log(`Example app listening at http://localhost:2000`);
});
