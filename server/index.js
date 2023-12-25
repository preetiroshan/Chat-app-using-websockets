import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const metaUrl = import.meta.url;
const __fileName = fileURLToPath(metaUrl);
const __dirname = path.dirname(__fileName);

const app = express();
// Serve static files on the same server
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3500;
const expressServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

// socket.emit => emits event for specific user
// io.emit => emits event for all users
// socket.broadcast.emit => emits events for all users EXCEPT the current user

io.on("connection", (socket) => {
  const userId = socket.id.substring(0, 5);

  // On connection - only to user
  socket.emit("Welcome to chat app");

  // On connection - to all others
  socket.broadcast.emit("message", `User ${userId} connected`);
  // socket.on => listens for events on socket
  socket.on("message", (data) => {
    console.log("data on socket", data);
    io.emit("message", `${userId}: ${data}`);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("message", `User ${userId} disconnected`);
  });

  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });
});
