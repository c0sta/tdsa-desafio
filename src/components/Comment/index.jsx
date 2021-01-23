import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";

import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export const Comment = ({ commentData }) => {
  const styles = useStyles();
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://i.pinimg.com/236x/50/e7/b9/50e7b9e3b515c09f11365487a7336f8f.jpg"
          />
        </ListItemAvatar>
        <ListItemText
          primary={commentData.name}
          secondary={
            <Box>
              <Typography
                component="span"
                variant="body2"
                className={styles.inline}
                color="textPrimary"
              >
                {commentData.email}
              </Typography>
              <Typography component="span" variant="body2" color="textPrimary">
                {commentData.body}
              </Typography>
            </Box>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
