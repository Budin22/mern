import React from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
type Props = {};

export const Message = (props: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="p">
          Text
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="h5" color="text.secondary">
          author
        </Typography>
      </CardActions>
    </Card>
  );
};
