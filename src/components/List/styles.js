import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  commentsContainer: {
    // display: "flex", //Resolveu o bug da listagem de comentários
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    overflowY: "auto",
    width: "100%",
    maxWidth: "65ch",
    padding: theme.spacing(1),
    marginTop: theme.spacing(5),
    maxHeight: "20ch",
  },
  emptyListMessage: {
    fontSize: 16,
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(3),
  },
}));
