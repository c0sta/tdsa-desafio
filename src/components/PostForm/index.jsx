import { Box, Button, Divider, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { create, getPost } from "../../services/postService";
import { ModalContext } from "../../providers/modal";
import { useSnackbar } from "notistack";
import { CommentsForm } from "../CommentsForm";
import { Alert } from "@material-ui/lab";
import { useFormContext } from "../../providers/form";

const useStyles = makeStyles((theme) => ({
  submit: {
    marginRight: theme.spacing(1, 1, 1),
  },
}));

export const PostForm = () => {
  const { formState, setFormValues } = useFormContext();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: formState.post?.title,
      post: formState.post?.post,
    },
  });
  const { modalState, setToggleModal } = React.useContext(ModalContext);
  const [postId, setPostId] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const styles = useStyles();

  const onSubmit = (formData) => {
    return create(formData).then((response) => {
      if (response.data) {
        console.log("Salvar - Response", response);

        enqueueSnackbar(`${formData.title} - Publicado com sucesso!`, {
          variant: "success",
        });
        reset();

        setFormValues({
          type: "post",
          payload: {
            id: response.data?.id,
            title: response.data?.title,
            post: response.data?.post,
          },
        });
        setPostId(response.data.id); // postId
        return response;
      }
    });
  };

  const submitAndRedirect = async (formData) => {
    await onSubmit(formData);
    setToggleModal({ type: "close" });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              id="title"
              label="Título"
              name="title"
              inputRef={register({
                required: { value: true, message: "Título é obrigatório" },
                maxLength: { value: 20, message: "Máximo de 20 caracteres" },
                minLength: { value: 2, message: "Mínimo de 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
              defaultValue={formState.title}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="post"
              label="Publicação"
              type="text"
              id="post"
              rows="4"
              multiline
              inputRef={register({
                required: {
                  value: true,
                  message: "Publicação é um campo obrigatório",
                },
                maxLength: {
                  value: 120,
                  message: "Máximo de 120 caracteres",
                },
                minLength: { value: 10, message: "Mínimo de 10 caracteres" },
              })}
              error={!!errors.post}
              helperText={errors.post?.message}
            />
          </Grid>
        </Grid>

        <Divider />

        <Box display="flex" width="100%" margin={1}>
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
              onClick={() => handleSubmit(submitAndRedirect)}
            >
              Salvar
            </Button>
          </Box>
          <Box flexShrink={0}>
            <Button
              onClick={() => handleSubmit(onSubmit)}
              variant="contained"
              type="submit"
              color="primary"
            >
              Salvar e Continuar
            </Button>
          </Box>
        </Box>
      </form>

      {!!postId && <CommentsForm postId={postId}></CommentsForm>}
    </>
  );
};
