import React from "react";
import MessageOutlined from "@material-ui/icons/MessageOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  Box,
  Collapse,
  Typography,
  IconButton,
  Grid,
  makeStyles,
  Button,
  Divider,
} from "@material-ui/core";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import SendIcon from "@material-ui/icons/Send";
import { create } from "../../services/postService";
import { useFormContext } from "../../providers/form";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
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
    marginLeft: theme.spacing(1.3),
    marginTop: theme.spacing(1),
  },
}));

export const CommentsForm = ({ postId }) => {
  const [isOpen, setOpen] = React.useState(false);
  const { formState, setFormValues } = useFormContext();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: formState.comment?.name,
      email: formState.comment?.email,
      body: formState.comment?.body,
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

    return create({ ...formData, postId: postId }).then((response) => {
      console.log("Comentario Response => ", response);
    });
  };

  const AddComment = () => {
    return (
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
          >
            Enviar
          </Button>
        </Grid>
      </form>
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
          onClick={() => setOpen(!isOpen)}
          disabled={!(postId > 0)}
        >
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>

      <Collapse
        className={styles.collapseContainer}
        in={isOpen}
        timeout="auto"
        unmountOnExit
      >
        <AddComment />
      </Collapse>
    </>
  );
};
