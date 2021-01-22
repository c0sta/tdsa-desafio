import React from "react";
import Modal from "../../components/Modal";
import { PostForm } from "../../components/PostForm";

export const AddPost = () => {
  return (
    <Modal>
      <PostForm />
    </Modal>
  );
};
