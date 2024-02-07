import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { Comic } from "../../types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTag, removeTag } from "../../redux/librarySlice";
interface ManageCategoryItemProps {
  info: { tagName: string; tagId: string; comics: Comic[] };
}

export default function ManageCategoryItem(props: ManageCategoryItemProps) {
  const { info } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.info.tagName);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useDispatch();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const confirmEdit = () => {
    setIsEditing(false);
    dispatch(updateTag({ tagId: info.tagId, name: inputValue, readingListOrComic: "comic" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmEdit();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDelete = () => {
    dispatch(removeTag({ tagId: info.tagId, readingListOrComic: "comic" }));
    setConfirmDelete(false);
  };

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete);
  };

  return (
    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {isEditing ? (
        <>
          <form onSubmit={handleSubmit}>
            <TextField value={inputValue} onChange={handleInput} autoFocus />
          </form>
          <CheckIcon onClick={confirmEdit} color="success" />
        </>
      ) : (
        <>
          <p style={{ maxWidth: "200px", wordWrap: "break-word" }}>{info.tagName}</p>
          <EditIcon onClick={toggleEditing} />
        </>
      )}
      {confirmDelete ? (
        <>
          <p>Delete category?</p>
          <Button variant="contained" color="success" onClick={handleDelete}>
            Confirm
          </Button>
          <Button variant="outlined" color="error" onClick={toggleConfirmDelete}>
            Cancel
          </Button>
        </>
      ) : (
        <ClearIcon color="error" onClick={toggleConfirmDelete} />
      )}
    </span>
  );
}
