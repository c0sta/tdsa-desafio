import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
} from "@material-ui/core";
import { useStyles } from "./styles";
import React from "react";

export const Comment = ({ data }) => {
  const styles = useStyles();
  return (
    <>
      <ListItem alignItems="flex-start" data-testid="comment-item">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://i.pinimg.com/236x/50/e7/b9/50e7b9e3b515c09f11365487a7336f8f.jpg"
          />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Box className={styles.titleContainer}>
              <Typography
                component="span"
                variant="h6"
                className={styles.title}
                color="textPrimary"
              >
                <strong>{data.name}</strong>
              </Typography>
              <Typography
                component="p"
                variant="subtitle1"
                className={styles.subtitle}
                color="textPrimary"
              >
                {data.email}
              </Typography>
            </Box>
          }
          secondary={
            <Box>
              <Typography
                component="p"
                className={styles.body}
                color="textPrimary"
              >
                {data.body}
              </Typography>
            </Box>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
