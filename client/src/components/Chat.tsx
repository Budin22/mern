import React, { useEffect, useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Message } from "./Message";
import { MessageI, SocketT } from "../App";

interface Props {
  userName: string;
  room: string;
  socket: SocketT;
}
export const Chat = (props: Props) => {
  const { userName, room, socket } = props;

  const [msg, setMsg] = useState<Array<MessageI>>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    socket.on("receive-message", (message: MessageI) => {
      if (!ignore) {
        if (msg.length === 0) {
          setMsg((state) => [message, ...state]);
        } else if (msg[msg.length - 1].id !== message.id) {
          setMsg((state) => [message, ...state]);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim()) {
      const time = new Date(Date.now()).toLocaleString();
      const data: MessageI = {
        msg: message,
        author: userName,
        time,
        id: Date.now().toString(),
        room,
      };
      socket.emit("send-message", data);
      setMsg((state) => [data, ...state]);
      setMessage("");
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h3" color="steelblue">
        {userName}
      </Typography>

      <Stack maxWidth={240} gap={3} marginBottom={2}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          variant="standard"
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Stack>
      <Stack sx={{ gap: 1 }}>
        {msg.map(({ author, msg, time, id }) => (
          <Message
            key={id}
            author={author}
            msg={msg}
            time={time}
            id={id}
            userName={userName}
          />
        ))}
      </Stack>
    </Container>
  );
};
