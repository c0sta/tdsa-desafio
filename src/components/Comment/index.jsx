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
    width: "50%",
    backgroundColor: theme.palette.background.paper,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
  body: {
    fontSize: 14,
    color: "#333",
  },
}));

export const Comment = ({ data }) => {
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
