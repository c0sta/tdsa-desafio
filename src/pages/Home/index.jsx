import { Button, Container, Grid } from "@material-ui/core";
import React, { useState } from "react";
import CollapsiblePost from "../../components/CollapsiblePost";
import { getAllPosts } from "../../services/postService";

import Table from "../../components/Table";
import { makeStyles } from "@material-ui/core/styles";
import { AddPost } from "../AddPost";
import { ModalContext } from "../../context/modalContext";
import Header from "../../components/Header";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignSelf: "right",
  },
}));

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { modalState, modalDispatch } = React.useContext(ModalContext);
  const styles = useStyles();

  React.useEffect(() => {
    (() => getAllPosts().then((postsArray) => setPosts(postsArray)))();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="md" className={styles.container}>
        <Grid container direction="row">
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            onClick={() =>
              modalDispatch({
                type: "open",
                payload: "Novo Post",
              })
            }
          >
            Adicionar post
          </Button>

          <Table tableHeaderTitles={["Post", "Texto"]}>
            {posts.map((post) => (
              <CollapsiblePost key={post.id} post={post} />
            ))}
          </Table>
          {modalState.isOpen ? <AddPost /> : null}
        </Grid>
      </Container>
    </>
  );
}
