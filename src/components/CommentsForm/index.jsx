import React from "react";
import MessageOutlined from "@material-ui/icons/MessageOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AddIcon from "@material-ui/icons/AddCircle";

import {
  Box,
  Collapse,
  Typography,
  IconButton,
  Grid,
  Button,
  Avatar,
  InputAdornment,
} from "@material-ui/core";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import SendIcon from "@material-ui/icons/Send";
import { postService } from "../../services";
import { useFormContext } from "../../providers/form";
import { List } from "../List";
import { Modal as MuiModal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
import { useStyles } from "./styles";
import { AccountCircle } from "@material-ui/icons";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { useTranslation } from "react-i18next";

export const CommentsForm = ({ postId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const { formState, setFormValues } = useFormContext();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onSubmit",
  });
  const { t, i18n } = useTranslation();

  const styles = useStyles();

  const onSubmit = (formData) => {
    setFormValues({
      type: "comment",
      payload: {
        name: formData.name,
        email: formData.email,
        body: formData.body,
      },
    });
    setFormValues({
      type: "comments",
      payload: [
        ...formState.comments,
        {
          name: formData.name,
          email: formData.email,
          body: formData.body,
        },
      ],
    });
    reset();
    setShowForm(!showForm);
    return postService
      .create({ ...formData, postId: postId })
      .then((response) => {
        console.log("Comentario Response => ", response);
      });
  };

  const AddComment = () => {
    return (
      <MuiModal open={showForm} className={styles.root}>
        <form className={styles.paper} onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            margin={2}
          >
            <Avatar className={styles.avatar}>
              <ChatIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("titleModalComment")}
            </Typography>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setShowForm(!showForm);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                name="name"
                label="Nome"
                type="text"
                id="name"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Nome é um campo obrigatório",
                  },
                  maxLength: {
                    value: 40,
                    message: "Máximo de 40 caracteres",
                  },
                  minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                })}
                className={styles.inputMargin}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name="email"
                label="E-mail"
                type="email"
                id="email"
                inputRef={register({
                  required: {
                    value: true,
                    message: "E-mail é um campo obrigatório",
                  },
                  maxLength: {
                    value: 60,
                    message: "Máximo de 60 caracteres",
                  },
                  minLength: { value: 10, message: "Mínimo de 10 caracteres" },
                })}
                className={styles.inputMargin}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Input
              name="body"
              label="Comentar"
              type="text"
              id="body"
              multiline
              rows={2}
              inputRef={register({
                required: {
                  value: true,
                  message: "Comentário é um campo obrigatório",
                },
                maxLength: {
                  value: 120,
                  message: "Máximo de 120 caracteres",
                },
                minLength: { value: 10, message: "Mínimo de 10 caracteres" },
              })}
              className={styles.inputMargin}
              error={!!errors.body}
              helperText={errors.body?.message}
            />
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            startIcon={<SendIcon />}
            className={styles.submitButton}
            onClick={() => handleSubmit(onSubmit)}
            fullWidth
          >
            {t("buttonSendComment")}
          </Button>
        </form>
      </MuiModal>
    );
  };
  return (
    <>
      <Box className={styles.boxContainer} flexGrow={1}>
        <Typography variant="h6" gutterBottom component="div">
          <Box display="flex" flexDirection="row" alignItems="center">
            <MessageOutlined className={styles.icon} />
            {t("titleComment")}
          </Box>
        </Typography>

        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowComments(!showComments);
          }}
          disabled={!(postId > 0)}
        >
          {showComments ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>

      <Collapse
        className={styles.collapseContainer}
        in={isOpen}
        timeout="auto"
        unmountOnExit
      >
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <IconButton
            aria-label="open modal"
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              setShowForm(!showForm);
            }}
            disabled={!postId}
            // className={styles.addCommentButton}
          >
            {t("buttonAddComment")} <AddIcon />
          </IconButton>
        </Box>
        {showForm && <AddComment />}
        <Box>
          <List isComments />
        </Box>
      </Collapse>
    </>
  );
};
