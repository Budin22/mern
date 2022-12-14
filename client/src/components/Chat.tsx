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
  const [isOldChat, setIsOldChat] = useState<boolean>(true);

  useEffect(() => {
    if (isOldChat) {
      socket.emit("get-chat", room);
      socket.on("get-chat", (chat: Array<MessageI>) => {
        setMsg(chat);
      });
      setIsOldChat(() => false);
    }

    socket.on("receive-message", (chat: Array<MessageI>) => {
      setMsg(chat);
    });
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
      setMessage("");
    }
  };

  console.log(msg);

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
        {msg?.map(({ author, msg, time, id }) => (
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
