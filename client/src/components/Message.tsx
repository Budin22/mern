import React from "react";
import { Card, Typography } from "@mui/material";

type Props = {
  msg: string;
  author: string;
  time: string;
  id: string;
  userName: string;
};

export const Message = (props: Props) => {
  const { author, msg, time, userName } = props;
  const bg = userName === author ? "lightsteelblue" : "white";
  return (
    <Card sx={{ maxWidth: 500, padding: 1, backgroundColor: bg }}>
      <Typography variant="h6" component="p">
        {msg}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {author} : {time}
      </Typography>
    </Card>
  );
};
