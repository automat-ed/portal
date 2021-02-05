const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// Initialize modules
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(
  express.static("public", {
    fallthrough: false,
  })
);

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
