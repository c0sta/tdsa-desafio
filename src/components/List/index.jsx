import React, { useState } from "react";
import { ModalContext } from "../../providers/modal";
import { commentService, postService } from "../../services";
import { Comment, Post } from "../../components";
import { List as VList } from "react-virtualized";
import {
  Box,
  CircularProgress,
  List as MuiList,
  Typography,
} from "@material-ui/core";
import { useFormContext } from "../../providers/form";
import { useStyles } from "./styles";
export function List({ isPosts, isComments }) {
  const [isLoading, setIsLoading] = useState(true);
  const { modalState } = React.useContext(ModalContext);
  const { formState, setFormValues } = useFormContext();
  const { isSearching, foundPosts, searchField, comments, posts } = formState;

  const styles = useStyles();

  React.useEffect(() => {
    if (isPosts) loadPosts();
    else loadComments();
  }, [isPosts]);

  const loadPosts = () => {
    postService
      .getAll()
      .then((postsArray) => {
        console.log("Loader de Postagens ->", postsArray);
        setFormValues({ type: "posts", payload: [...postsArray] });
      })
      .finally(() => setIsLoading(false));
  };

  const loadComments = () => {
    if (modalState.postId !== 0)
      commentService
        .getAllByPostId(modalState?.postId)
        .then((commentsArray) => {
          setFormValues({ type: "comments", payload: [...commentsArray] });
          console.log("Loader de Comentários => ", commentsArray);
        })
        .finally(() => setIsLoading(false));
  };

  const validateEmptyList = () => {
    const isPostsEmpty = !(posts.length > 0);
    const isCommentsEmpty = !(comments.length > 0);
    return { isPostsEmpty, isCommentsEmpty };
  };
  const { isPostsEmpty, isCommentsEmpty } = validateEmptyList();

  return (
    <MuiList className={isPosts ? styles.container : styles.commentsContainer}>
      {isComments & !isPosts & !isSearching
        ? comments.map((comment) => (
            <Comment key={comment.id} data={comment}></Comment>
          ))
        : null}

      {isPosts & !isSearching & !isComments
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : foundPosts.map((post) => <Post key={post.id} post={post} />)}

      {isCommentsEmpty & isComments & !isLoading ? (
        <Typography className={styles.emptyListMessage}>
          Não há comentários até o momento
        </Typography>
      ) : null}
      {isPostsEmpty & isPosts & !isLoading ? (
        <Typography className={styles.emptyListMessage}>
          Não há postagens, volte mais tarde
        </Typography>
      ) : null}
      {isLoading && <CircularProgress />}
    </MuiList>
  );
}
