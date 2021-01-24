import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ModalContext } from "../../providers/modal";
import { commentService, postService } from "../../services";
import { Comment, Post } from "../../components";
import { List as VList } from "react-virtualized";
import {
  CircularProgress,
  List as MuiList,
  Typography,
} from "@material-ui/core";
import { useFormContext } from "../../providers/form";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
    maxWidth: "60ch",
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    maxHeight: "17ch",
  },
  button: {
    margin: theme.spacing(3),
  },
}));

export function List({ isPosts }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const { formState, setFormValues } = useFormContext();
  const [isLoading, setIsLoading] = useState(true);
  const { modalState } = React.useContext(ModalContext);

  const styles = useStyles();

  React.useEffect(() => {
    if (isPosts) loadPosts();
    else loadComments();
  }, []);

  const loadPosts = () => {
    postService
      .getAll()
      .then((postsArray) => {
        setPosts(postsArray);
      })
      .finally(() => setIsLoading(false));
  };
  const loadComments = () => {
    console.log("Loader de Comentarios => ", comments);
    if (modalState.postId !== 0)
      commentService
        .getAllByPostId(modalState?.postId)
        .then((commentsArray) => {
          // setFormValues({ type: "comments", payload: [...commentsArray] });
          setComments(commentsArray);
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
      {isPosts
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : comments.map((comment) => (
            <Comment key={comment.id} data={comment}></Comment>
          ))}
      {isLoading && <CircularProgress />}

      {isPostsEmpty & isPosts ? (
        <Typography>Não há postagens, volte mais tarde</Typography>
      ) : null}

      {isCommentsEmpty & !isPosts ? (
        <Typography>Não há comentários até o momento</Typography>
      ) : null}
    </MuiList>
  );
}
