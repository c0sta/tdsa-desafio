import React from "react";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { ModalContext } from "../../providers/modal";

import { postService } from "../../services";

export function Post({ post }) {
  const [open, setOpen] = React.useState(false);

  const { modalState, setToggleModal } = React.useContext(ModalContext);

  const removePost = (id) => {
    return postService.delete(id).then((response) => console.log(response));
  };

  const editPost = (id) => {
    // console.log("Edit: ", id);
    return setToggleModal({
      type: "open",
      payload: { title: "Editar Post", type: "edit", postId: id },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {post.title}
        </TableCell>
        <TableCell align="right">{post.body}</TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => editPost(post.id)}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => removePost(post.id)}
          >
            <DeleteOutlinedIcon />
          </IconButton>

          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {/**
       *
       * Collapsible
       *
       */}
      <TableRow>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h5" gutterBottom component="h5">
              Comentários
            </Typography>
          </Box>
        </Collapse>
      </TableRow>
    </>
  );
}
