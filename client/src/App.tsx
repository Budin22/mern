import React, { useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField } from "@mui/material";
import { Chat } from "./components/Chat";

const socket = io("http://localhost:5050");

export type SocketT = typeof socket;

export interface MessageI {
  msg: string;
  author: string;
  room: string;
  time: string;
  id: string;
}

function App() {
  const [author, setAuthor] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [inChat, setInChat] = useState<boolean>(false);

  const joinRoom = () => {
    if (room.trim() && author.trim()) {
      socket.emit("join-room", room);
      setInChat(true);
    }
  };

  return (
    <Container>
      {!inChat ? (
        <Stack maxWidth={240} gap={3} marginBottom={2}>
          <TextField
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            label="Author"
            variant="standard"
          />
          <TextField
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            label="Room"
            variant="standard"
          />
          <Button variant="contained" onClick={joinRoom}>
            Join Room
          </Button>
        </Stack>
      ) : (
        <Chat userName={author} room={room} socket={socket} />
      )}
    </Container>
  );
}
export default App;
