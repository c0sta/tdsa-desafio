import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h5" color="inherit">
          Postagens
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
