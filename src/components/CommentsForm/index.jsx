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
  makeStyles,
  Button,
  Divider,
  Avatar,
} from "@material-ui/core";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import SendIcon from "@material-ui/icons/Send";
import { postService } from "../../services";
import { useFormContext } from "../../providers/form";
import { List } from "../List";
import { Modal as MuiModal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "0px solid #fff",
  },
  boxContainer: {
    margin: theme.spacing(1, 1, 1),
    marginTop: theme.spacing(3),

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputMargin: { marginTop: theme.spacing(1) },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  collapseContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContext: "flex-end",
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
}));

export const CommentsForm = ({ postId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const { formState, setFormValues } = useFormContext();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: formState?.comment.name,
      email: formState?.comment.email,
      body: formState?.comment.body,
    },
  });
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
            margin={2}
          >
            <Avatar>
              <AddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Comentar
            </Typography>
            <IconButton
              aria-label="expand row"
              size="small"
              color="primary"
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
            Enviar
          </Button>
        </form>
      </MuiModal>
    );
  };
  return (
    <>
      <Divider />
      <Box className={styles.boxContainer} flexGrow={1}>
        <Typography variant="h6" gutterBottom component="div">
          <Box display="flex" flexDirection="row" alignItems="center">
            <MessageOutlined className={styles.icon} />
            Comentários
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
            <AddIcon /> Adicionar Comentário
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
