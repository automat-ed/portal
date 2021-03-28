import io from "socket.io-client";

console.log("Hello");
let socket = io({
  extraHeaders: {
    secret: "frontend",
  },
});

export default socket;
