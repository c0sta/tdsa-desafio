import { Button, Container, Grid } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { ModalContext } from "../../providers/modal";
import { Header, PostForm, List } from "../../components";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(3),
  },
}));

export default function Home() {
  const { modalState, setToggleModal } = React.useContext(ModalContext);

  const styles = useStyles();

  const openModal = () => {
    setToggleModal({
      type: "open",
      payload: { title: "Novo Post", type: "new" },
    });
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" className={styles.container}>
        <Grid container direction="column" justify="flex-end">
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            onClick={() => openModal()}
          >
            Adicionar post
          </Button>

          <List isPosts />

          {modalState.type === "new" ? <PostForm isAdd /> : <PostForm isEdit />}
        </Grid>
      </Container>
    </>
  );
}
