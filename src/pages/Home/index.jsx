import { Button, Container, Grid } from "@material-ui/core";
import React from "react";

import { ModalContext } from "../../providers/modal";
import { Header, PostForm, List } from "../../components";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles";

export default function Home() {
  const { modalState, setToggleModal } = React.useContext(ModalContext);

  const styles = useStyles();
  const { t } = useTranslation();

  const openModal = () => {
    setToggleModal({
      type: "open",
      payload: { title: t("titleModalNew"), type: "new" },
    });
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" className={styles.container}>
        <Grid>
          <Grid container flexdirection="row" justify="flex-end">
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              onClick={() => openModal()}
              data-testid="add-button"
            >
              {t("buttonAddPost")}
              <AddIcon />
            </Button>
          </Grid>
          <List isPosts />

          {modalState.type === "new" ? <PostForm isAdd /> : <PostForm isEdit />}
        </Grid>
      </Container>
    </>
  );
}
