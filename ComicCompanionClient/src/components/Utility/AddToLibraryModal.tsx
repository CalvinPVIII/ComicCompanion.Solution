import { Modal } from "@mui/material";
// import { useState } from "react";
import "../../styles/AddToLibraryModal.css";

interface AddToLibraryModalProps {
  open: boolean;
  setClose: () => void;
}

export default function AddToLibraryModal(props: AddToLibraryModalProps) {
  return (
    <>
      <Modal open={props.open} onClose={props.setClose}>
        <h1>Add to library</h1>
      </Modal>
    </>
  );
}
