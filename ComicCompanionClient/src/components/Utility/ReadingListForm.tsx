import { useSelector, useDispatch } from "react-redux";
import { currentListSelector, isCreatingSelector } from "../../redux/store";
import { updateProperty, toggleCreating, setCurrentList } from "../../redux/listCreationSlice";
import { Button, Switch, TextField } from "@mui/material";

import { useEffect } from "react";
import defaultList from "../../helpers/defaultReadingList";

export default function ReadingListForm() {
  const dispatch = useDispatch();
  const list = useSelector(currentListSelector);
  const isCreating = useSelector(isCreatingSelector);

  useEffect(() => {
    if (!isCreating && !list) {
      dispatch(setCurrentList(defaultList));
      dispatch(toggleCreating(true));
    }
  }, [isCreating, list]);

  const handleUpdateProperty = (propertyName: string, value: string | boolean) => {
    dispatch(updateProperty({ propertyName, value }));
  };

  const handleSubmit = () => {
    console.log(list);
  };

  if (list) {
    return (
      <>
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
          <div style={{ display: "flex", flexFlow: "column", maxWidth: "250px" }}>
            <TextField label="Name" variant="standard" value={list.name} onChange={(e) => handleUpdateProperty("name", e.target.value)} />
            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="standard"
              value={list.description}
              onChange={(e) => handleUpdateProperty("description", e.target.value)}
            />
            <div>
              <Switch onChange={(e) => handleUpdateProperty("isPrivate", e.target.checked)} checked={list.isPrivate} />
              <label>Private</label>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Create
              </Button>
              <Button variant="outlined" color="error">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
