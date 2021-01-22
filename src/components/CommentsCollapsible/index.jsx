import React from "react";
import MessageOutlined from "@material-ui/icons/MessageOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  Box,
  Collapse,
  Typography,
  IconButton,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Form } from "../Form";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  boxContainer: {
    margin: theme.spacing(1, 1, 1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputMargin: { marginTop: theme.spacing(1) },
  submitButton: {
    marginLeft: theme.spacing(3),
  },
}));

export const CommentsCollapsible = ({ isDisabled, postId }) => {
  const [isOpen, setOpen] = React.useState(false);

  const { register, handleSubmit } = useForm();

  const styles = useStyles();

  const onSubmit = (formData, event) => {
    event.preventDefault();
    alert(formData);
    // ADD postId no json do formData
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.boxContainer} flexGrow={1}>
        <Typography variant="h6" gutterBottom component="div">
          <Box display="flex" flexDirection="row" alignItems="center">
            <MessageOutlined className={styles.icon} />
            Comentários
          </Box>
        </Typography>

        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!isOpen)}
          // disabled={!postState.postId}
        >
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Grid container spacing={2}>
          {/* <Typography variant="h5" component="h5">
            Comentar
          </Typography> */}
          <Grid item xs={12} sm={6}>
            <Input
              variant="outlined"
              required
              fullWidth
              name="name"
              label="name"
              type="text"
              id="name"
              inputRef={register({
                required: true,
                maxLength: 40,
                minLength: 3,
              })}
              className={styles.inputMargin}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              variant="outlined"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              inputRef={register({ required: true })}
              className={styles.inputMargin}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              variant="outlined"
              required
              fullWidth
              name="body"
              label="Comentar"
              type="text"
              id="body"
              multiline
              rows={2}
              inputRef={register({ required: true })}
              className={styles.inputMargin}
            />
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<SendIcon />}
            type="submit"
            className={styles.inputMargin}
          >
            Enviar
          </Button>
        </Grid>
      </Collapse>
    </Form>
  );
};
