import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

type MsgT = {
  msg: string;
  author: string;
  time: string;
  id: string;
  room: string;
};

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-chat", (room: string) => {
    let chat: Array<MsgT> = [];
    const pathToChat = path.join(__dirname, "/chats", `${room}.txt`);
    if (fs.existsSync(pathToChat)) {
      chat = JSON.parse(fs.readFileSync(pathToChat, "utf8"));
    }
    socket.emit("get-chat", chat);
  });

  socket.on("send-message", (data: MsgT) => {
    let chat: Array<MsgT> = [];
    const pathToChat = path.join(__dirname, "/chats", `${data.room}.txt`);
    if (fs.existsSync(pathToChat)) {
      chat = JSON.parse(fs.readFileSync(pathToChat, "utf8"));
    }

    fs.writeFileSync(pathToChat, JSON.stringify([data, ...chat]));
    chat = JSON.parse(fs.readFileSync(pathToChat, "utf8"));

    io.sockets.to(data.room).emit("receive-message", chat);
  });

  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`userid ${socket.id} join room: ${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`User dis ${socket.id}`);
  });
});

server.listen(5050, () => {
  console.log("Server run on port: 5050");
});
