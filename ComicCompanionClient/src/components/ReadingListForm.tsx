import { FormControl, Input, FormLabel, Button } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
interface ReadingListFormProps {
  currentEditingReadingList?: LocalReadingList;
  setFormVisibility?: React.Dispatch<SetStateAction<boolean>>;
}

import { useDispatch } from "react-redux";
import { LocalReadingList, editCurrentEditingReadingList, setCreatingReadingList } from "../redux/readingListReducer";

export default function ReadingListForm(props: ReadingListFormProps) {
  const [inputName, setInputName] = useState(props.currentEditingReadingList?.name || "");
  const [inputDescription, setInputDescription] = useState(props.currentEditingReadingList?.description || "");
  const dispatch = useDispatch();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const issues = props.currentEditingReadingList?.issues || [];
    dispatch(editCurrentEditingReadingList({ issues: issues, name: inputName, description: inputDescription }));
    dispatch(setCreatingReadingList(true));
    if (props.setFormVisibility) props.setFormVisibility(false);
  };

  return (
    <form className="reading-list-form" onSubmit={handleFormSubmit}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Reading List Name" value={inputName} onChange={(e) => setInputName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input placeholder="Reading List Description" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
      </FormControl>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit">Save</Button>
      </span>
    </form>
  );
}
