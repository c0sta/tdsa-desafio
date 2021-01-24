import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Modal as MuiModal,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import { ModalContext } from "../../providers/modal";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "../";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

export function Modal({ handleSubmit, handleSubmitAndRedirect, ...props }) {
  const styles = useStyles();
  const { modalState, setToggleModal } = React.useContext(ModalContext);
  const { t, i18n } = useTranslation();

  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.root}
      open={modalState.isOpen}
      onClose={() => setToggleModal({ type: "close" })}
      closeAfterTransition
      {...props}
    >
      <Fade in={modalState.isOpen}>
        <div className={styles.paper}>
          <Box className={styles.modalTitle}>
            <Avatar className={styles.avatar}>
              {modalState.type === "new" ? <AddCircleIcon /> : <EditIcon />}
            </Avatar>
            <Typography component="h1" variant="h5">
              {modalState.title}
            </Typography>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setToggleModal({ type: "close" });
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {props.children}

          <Divider />

          <footer className={styles.modalFooter}>
            <Box display="flex" width="100%" margin={1}>
              <Box flexGrow={1}>
                <Button
                  color="secondary"
                  onClick={() => {
                    setToggleModal({ type: "close" });
                  }}
                >
                  {t("backButton")}
                </Button>
              </Box>

              <Box flexShrink={1}>
                <Button
                  color="primary"
                  className={styles.submit}
                  onClick={() => handleSubmitAndRedirect()}
                >
                  {t("saveButton")}
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => handleSubmit()}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  {t("saveAndContinueButton")}
                </Button>
              </Box>
            </Box>
          </footer>
        </div>
      </Fade>
    </MuiModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
