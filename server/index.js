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

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.on("message", (data) => {
    console.log("data on socket", data);
    io.emit("message", `${socket.id.substring(0, 6)}: ${data}`);
  });
});
