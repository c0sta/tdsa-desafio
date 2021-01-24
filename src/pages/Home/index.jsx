import { Button, Container, Grid } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { ModalContext } from "../../providers/modal";
import { Header, PostForm, List } from "../../components";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(3),
    // background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
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
        <Grid>
          <Grid container flexDirection="row" justify="flex-end">
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              onClick={() => openModal()}
            >
              <AddIcon /> Adicionar post
            </Button>
          </Grid>
          <List isPosts />

          {modalState.type === "new" ? <PostForm isAdd /> : <PostForm isEdit />}
        </Grid>
      </Container>
    </>
  );
}
