import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { ModalContext } from "../../providers/modal";
import { postService } from "../../services";
import Swal from "sweetalert2";
import { useFormContext } from "../../providers/form";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

export function Post({ post }) {
  const { setToggleModal } = React.useContext(ModalContext);
  const { formState, setFormValues } = useFormContext();
  const styles = useStyles();
  const { t } = useTranslation();

  const removePost = (id) => {
    console.log(id);
    Swal.fire({
      title: t("alertTitle"),
      text: t("alertBody"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("alertConfirmButton"),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deletado!", "A postagem foi excluida", "success");

        if (formState.isSearching) {
          const filteredFoundPosts = formState.foundPosts.filter(
            (post) => post.id !== id
          );
          setFormValues({
            type: "deleteFound",
            payload: [...filteredFoundPosts],
          });
        } else {
          const filteredPosts = formState.posts.filter(
            (post) => post.id !== id
          );
          setFormValues({ type: "posts", payload: [...filteredPosts] });
        }
        return postService.delete(id).then((response) => console.log(response));
      }
    });
  };

  const editPost = (id) => {
    // console.log("Edit: ", id);
    return setToggleModal({
      type: "open",
      payload: { title: t("titleModalEdit"), type: "edit", postId: id },
    });
  };
  return (
    <>
      <ListItem alignItems="center" data-testid="post-item">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://i.pinimg.com/236x/50/e7/b9/50e7b9e3b515c09f11365487a7336f8f.jpg"
          />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Box>
              <Typography
                component="span"
                variant="h6"
                className={styles.title}
                color="textPrimary"
              >
                <strong>{post.title}</strong>
              </Typography>
            </Box>
          }
          secondary={
            <Box>
              <Typography className={styles.body} color="textPrimary">
                {post.body}
              </Typography>
            </Box>
          }
        />

        <Box display="flex" flexdirection="row">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => editPost(post.id)}
          >
            <EditOutlinedIcon color="primary" />
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => removePost(post.id)}
          >
            <DeleteOutlinedIcon color="error" />
          </IconButton>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
