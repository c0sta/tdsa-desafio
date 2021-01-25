import { Box, Button, Divider, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { postService } from "../../services";
import { useSnackbar } from "notistack";
import { ModalContext } from "../../providers/modal";
import { useFormContext } from "../../providers/form";
import { CommentsForm, Modal, Input } from "../";

const useStyles = makeStyles((theme) => ({
  submit: {
    marginRight: theme.spacing(1, 1, 1),
  },
}));

export const PostForm = ({ isAdd, isEdit }) => {
  const { formState, setFormValues } = useFormContext();
  const { register, handleSubmit, errors, reset, setValue } = useForm({
    mode: "onBlur",
  });
  const { modalState, setToggleModal } = React.useContext(ModalContext);
  const [postId, setPostId] = React.useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const styles = useStyles();

  React.useEffect(() => {
    if (!isAdd) loadFormData();
  }, [modalState.postId]);

  const createPost = (formData) => {
    return postService
      .create(formData)
      .then((response) => {
        if (response.data) {
          // console.log("Salvar - Response", response);
          enqueueSnackbar(`${formData.title} - Publicado com sucesso!`, {
            variant: "success",
          });
          reset();
          setFormValues({
            type: "post",
            payload: {
              id: response.data?.id,
              title: response.data?.title,
              body: response.data?.body,
            },
          });
          setFormValues({
            type: "posts",
            payload: [
              ...formState.posts,
              {
                id: response.data?.id,
                title: response.data?.title,
                body: response.data?.body,
              },
            ],
          });
          setPostId(response.data.id); // postId
          return response;
        }
      })
      .catch((error) =>
        enqueueSnackbar(` Erro ao publicar ${formData.title}!`, {
          variant: "error",
        })
      );
  };
  const editPost = (formData) => {
    const { postId } = modalState;
    return postService
      .update(formData, postId)
      .then((response) => {
        if (response) {
          enqueueSnackbar(`${formData.title} - Editado com sucesso!`, {
            variant: "success",
          });

          return response;
        }
      })
      .catch((error) =>
        enqueueSnackbar(` Erro ao editar ${formData.title}!`, {
          variant: "error",
        })
      );
  };

  const loadFormData = () => {
    if (modalState.postId !== 0)
      return postService.getById(modalState.postId).then((response) => {
        const formFields = ["title", "body"];

        formFields.forEach((field) => setValue(field, response[field]));
      });
  };

  const onSubmit = (formData) => {
    return isAdd ? createPost(formData) : editPost(formData);
  };

  const submitAndRedirect = async (formData) => {
    await onSubmit(formData);
    setToggleModal({ type: "close" });
  };

  return (
    <Modal
      handleSubmit={handleSubmit(onSubmit)}
      handleSubmitAndRedirect={handleSubmit(submitAndRedirect)}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        data-testid="post-form"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              id="title"
              label={!isAdd ? "" : "Título"}
              name="title"
              inputRef={register({
                required: { value: true, message: "Título é obrigatório" },
                maxLength: { value: 40, message: "Máximo de 40 caracteres" },
                minLength: { value: 2, message: "Mínimo de 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
              data-testid="title-field"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="body"
              label={!isAdd ? "" : "Publicação"}
              type="text"
              id="body"
              rows="4"
              multiline
              inputRef={register({
                required: {
                  value: true,
                  message: "Publicação é um campo obrigatório",
                },
                maxLength: {
                  value: 240,
                  message: "Máximo de 240 caracteres",
                },
                minLength: { value: 10, message: "Mínimo de 10 caracteres" },
              })}
              error={!!errors.body}
              helperText={errors.body?.message}
              data-testid="post-field"
            />
          </Grid>
        </Grid>
      </form>

      {(!!postId || isEdit) && (
        <CommentsForm postId={postId || modalState.postId}></CommentsForm>
      )}
    </Modal>
  );
};
