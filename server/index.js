import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: "3000" });
server.on("connection", (socket) => {
  socket.on("message", (message) => {
    const textFromBuffer = Buffer.from(message);
    console.log(textFromBuffer.toString());
    socket.send(`${message}`);
  });
});
