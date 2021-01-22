import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

export const Form = (props) => {
  const styles = useStyles();

  return (
    <form  className={styles.form} {...props}>
      {props.children}
    </form>
  );
};
