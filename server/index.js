import { WebSocketServer } from "ws";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.on("message", (data) => {
    console.log("data on socket", data);
    io.emit("message", `${socket.id.substring(0, 6)}: ${data}`);
  });
});

httpServer.listen(3500, () => {
  console.log("Server listening on port 3500");
});
