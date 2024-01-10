import { useSelector, useDispatch } from "react-redux";
import { currentListSelector, isCreatingSelector } from "../../redux/store";
import { updateProperty, toggleCreating, setCurrentList } from "../../redux/listCreationSlice";
import { Button, Switch, TextField } from "@mui/material";

import { useEffect, useState } from "react";
import defaultList from "../../helpers/defaultReadingList";

import { userSelector } from "../../redux/store";
import { UserReadingListPostRequest } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";

import { useNavigate } from "react-router-dom";

export default function ReadingListForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const list = useSelector(currentListSelector);
  const isCreating = useSelector(isCreatingSelector);
  const currentUser = useSelector(userSelector);

  const [listNameError, setListNameError] = useState<boolean>(false);
  const [listDescriptionError, setListDescriptionError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!isCreating && !list) {
      dispatch(setCurrentList(defaultList));
      dispatch(toggleCreating(true));
    }
  }, []);

  const handleUpdateProperty = (propertyName: string, value: string | boolean) => {
    dispatch(updateProperty({ propertyName, value }));
  };

  const handleSubmit = async () => {
    setListNameError(false);
    setListDescriptionError(false);
    setErrorMessage("");
    if (!list) return;
    if (list.name.length === 0) {
      setListNameError(true);
      return;
    }
    if (list.description.length === 0) {
      setListDescriptionError(true);
      return;
    }
    if (list.issues.length === 0) {
      setErrorMessage("Reading list is empty");
      return;
    }
    if (!currentUser) {
      setErrorMessage("Please sign in");
      // logic to open sign in modal
      return;
    }

    const readingList: UserReadingListPostRequest = {
      readingListId: 0,
      serializedIssues: JSON.stringify(list.issues),
      isPrivate: list.isPrivate,
      userId: currentUser.userId,
      name: list.name,
      description: list.description,
      coverImg: "null",
    };
    const response = await ComicCompanionAPIService.createReadingList(readingList, currentUser.token);
    if (response.status === "success") {
      nav(`/lists/${response.data.readingListId}`);
      dispatch(setCurrentList(null));
      dispatch(toggleCreating(false));
    }
    console.log(readingList);
  };

  const handleCancelCreation = () => {
    nav("/lists");
    dispatch(setCurrentList(null));
    dispatch(toggleCreating(false));
  };

  if (list) {
    return (
      <>
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
          <div style={{ display: "flex", flexFlow: "column", maxWidth: "250px" }}>
            <TextField
              label="Name"
              variant="standard"
              value={list.name}
              error={listNameError}
              onChange={(e) => handleUpdateProperty("name", e.target.value)}
            />
            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="standard"
              value={list.description}
              error={listDescriptionError}
              onChange={(e) => handleUpdateProperty("description", e.target.value)}
            />
            <div>
              <Switch onChange={(e) => handleUpdateProperty("isPrivate", e.target.checked)} checked={list.isPrivate} />
              <label>Private</label>
            </div>
            {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : <></>}

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Create
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancelCreation}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
