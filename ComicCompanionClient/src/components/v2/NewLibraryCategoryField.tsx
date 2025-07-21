import { Add, Folder } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTag } from "../../redux/librarySlice";
import { v4 as uuidv4 } from "uuid";

interface NewLibraryCategoryFieldProps {
  addCategoryCallback?: (tagId: string) => void;
  readingListOrComic: "readingList" | "comic";
}

export default function NewLibraryCategoryField(props: NewLibraryCategoryFieldProps) {
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
  };

  return (
    <div className="ml-6">
      <div className="flex text-sm gap-2 opacity-50">
        <Folder fontSize="small" />
        <p>Create New Category</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 items-center">
          <TextField label="Category Name" variant="filled" focused value={inputValue} onChange={handleInput} error={inputError} />
          <Button variant="contained" style={{ marginBottom: "-20px" }} type="submit">
            <Add className="mr-1" />
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
