import React from "react";
import { Avatar, Box, Modal as MuiModal, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ModalContext } from "../../context/modalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "0px solid #fff",
  },
  paper: {
    boxShadow: theme.shadows[5],
    border: "none",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "45%", // Fix IE 11 issue.
    height: "95%",
    marginTop: theme.spacing(3),
  },
  modalTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Modal({ ...props }) {
  const styles = useStyles();
  const { modalState, modalDispatch } = React.useContext(ModalContext);

  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.root}
      open={modalState.isOpen}
      onClose={() => modalDispatch({ type: "close" })}
      closeAfterTransition
      {...props}
    >
      <Fade in={modalState.isOpen}>
        <div className={styles.paper}>
          <Box className={styles.modalTitle}>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {modalState.title}
            </Typography>
          </Box>
          {props.children}
        </div>
      </Fade>
    </MuiModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
