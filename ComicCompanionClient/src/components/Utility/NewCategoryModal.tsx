import { Button, TextField, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTag } from "../../redux/librarySlice";
import { v4 as uuidv4 } from "uuid";
import "../../styles/NewCategoryModal.css";

interface NewCategoryModalProps {
  open: boolean;
  setClose: () => void;
  addCategoryCallback?: (tagId: string) => void;
  readingListOrComic: "readingList" | "comic";
}

export default function NewCategoryModal(props: NewCategoryModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputValue.length <= 25) {
      setInputValue(e.target.value);
    }
  };
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputError(false);
    if (inputValue.length <= 0) {
      setInputError(true);
      return;
    }
    const tagId = uuidv4();
    dispatch(addTag({ tagId: tagId, name: inputValue, readingListOrComic: props.readingListOrComic }));
    if (props.addCategoryCallback) {
      props.addCategoryCallback(tagId);
    }
    setInputValue("");
    props.setClose();
  };

  return (
    <Modal open={props.open} onClose={props.setClose}>
      <form id="new-category-modal-form" onSubmit={handleSubmit}>
        <TextField value={inputValue} onChange={handleInput} autoFocus error={inputError} />
        <Button variant="contained" type="submit">
          Add Category
        </Button>
      </form>
    </Modal>
  );
}
