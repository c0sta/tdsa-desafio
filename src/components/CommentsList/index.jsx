import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Comment } from "../Comment";
import { getAllCommentsFromPost } from "../../services/commentService";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function CommentsList() {
  const [comments, setComments] = React.useState([]);
  const classes = useStyles();
  // React.useEffect(() => {
  // Chamar serviço que irá buscar os commentarios de acordo com o postId
  // });

  return (
    <List className={classes.root}>
      {comments.map((comment) => (
        <Comment commentData={comment}></Comment>
      ))}
    </List>
  );
}
