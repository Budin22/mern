import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {});
});

server.listen(5050, () => {
  console.log("Server run on port: 5050");
});
