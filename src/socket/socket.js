import io from "socket.io-client";

let socket = io({
  extraHeaders: {
    secret: "frontend",
  },
});

export default socket;
