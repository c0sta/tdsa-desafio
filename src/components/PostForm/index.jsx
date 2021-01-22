import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../Form";
import { Input } from "../Input";
import { create } from "../../services/postService";
import { ModalContext } from "../../providers/modal";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { CommentsCollapsible } from "../CommentsCollapsible";
// import { usePostId } from "../../context/postContext";
// import { yupResolver } from "@hookform/resolvers";

const useStyles = makeStyles((theme) => ({
  submit: {
    marginRight: theme.spacing(1, 1, 1),
  },
}));

export const PostForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Campo de titulo é obrigatório!"),
    post: yup.string().required("Campo de texto obrigatório!"),
    messages: {
      postId: yup.number().required(),
      name: yup.string().required("Campo de nome é obrigatório"),
      email: yup.string().email().required("Campo de e-mail é obrigatório"),
      message: yup.string().required("Campo de mensagem é obrigatório"),
    },
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    // resolver: yupResolver(schema),
  });
  const { modalState, setToggleModal } = React.useContext(ModalContext);
  const { enqueueSnackbar } = useSnackbar();

  const styles = useStyles();

  const onSubmit = (formData) => {
    console.log("Salvar - FormData", formData);
    return create(formData).then((response) => {
      if (response.data) {
        enqueueSnackbar(`${formData.title} - Publicado com sucesso!`, {
          variant: "success",
        });
        console.log("Salvar - Response =>", response);
        return response;
      }
    });
  };

  const submitAndRedirect = async (formData) => {
    await onSubmit(formData);
    setToggleModal({ type: "close" });
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Título"
            name="title"
            inputRef={register({ required: true, maxLength: 30 })}
            errors={!!errors.title}
            helperText={errors?.title?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            variant="outlined"
            required
            fullWidth
            name="post"
            label="Post"
            type="text"
            id="post"
            rows="4"
            multiline
            inputRef={register({ required: true })}
            errors={!!errors.post}
            helperText={errors?.post?.message}
          />
        </Grid>
      </Grid>

      <CommentsCollapsible></CommentsCollapsible>

      <Box display="flex" width="100%">
        <Box flexGrow={1}>
          <Button
            color="secondary"
            onClick={() => {
              setToggleModal({ type: "close" });
            }}
          >
            Voltar
          </Button>
        </Box>

        <Box flexShrink={1}>
          <Button
            color="primary"
            className={styles.submit}
            onClick={handleSubmit(submitAndRedirect)}
          >
            Salvar
          </Button>
        </Box>
        <Box flexShrink={0}>
          <Button variant="contained" type="submit" color="primary">
            Salvar e Continuar
          </Button>
        </Box>
      </Box>
    </Form>
  );
};
