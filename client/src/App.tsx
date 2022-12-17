import React, { useRef } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField } from "@mui/material";
import { Message } from "./components/Message";

const socket = io("http://localhost:5050");

function App() {
  const message = useRef<HTMLInputElement>(null);
  const sendMessage = () => {
    if (message.current !== null) {
      socket.emit("send-message", { msg: message.current.value });
    }
  };
  return (
    <Container>
      <Stack maxWidth={240} gap={3}>
        <TextField
          inputRef={message}
          id="standard-basic"
          label="Message"
          variant="standard"
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Stack>
      <Message />
    </Container>
  );
}
export default App;
