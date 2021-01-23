import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
}));

export const Button = ({ handleClick, ...props }) => {
  return (
    <MuiButton
      className={styles.root}
      color="primary"
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </MuiButton>
  );
};
