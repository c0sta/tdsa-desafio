import { Button, Container, Grid, Modal } from "@material-ui/core";
import React, { useState } from "react";
import CollapsiblePost from "../../components/CollapsiblePost";

import PostsTable from "../../components/PostsTable";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
    return () => {};
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Adicionar post
          </Button>
          <PostsTable tableHeaderTitles={["Post", "Texto"]}>
            {posts.map((post) => (
              <CollapsiblePost key={post.id} post={post} />
            ))}
          </PostsTable>
        </Grid>
      </Container>
      {openModal ? (
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <h1>testando</h1>
        </Modal>
      ) : null}
    </>
  );
}
