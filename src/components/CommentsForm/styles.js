import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  boxContainer: {
    margin: theme.spacing(1, 1, 1),
    marginTop: theme.spacing(3),
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "0px solid #fff",
  },
  inputMargin: { marginTop: theme.spacing(1) },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  collapseContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContext: "flex-end",
    width: "90%",
  },
  paper: {
    boxShadow: theme.shadows[5],
    border: "none",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    maxWidth: "60%",
  },
  addCommentButton: {
    margin: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));
