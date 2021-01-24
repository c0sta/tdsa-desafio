import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1.5),
  },
  paper: {
    display: "flex",
    padding: theme.spacing(2.5),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.default,
    maxWidth: "60%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "45%", // Fix IE 11 issue.
    height: "95%",
    marginTop: theme.spacing(3),
  },
  modalTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2.5),
  },
  modalFooter: {
    width: "100%",
    margin: theme.spacing(1),
    marginTop: theme.spacing(2.5),
  },
}));
