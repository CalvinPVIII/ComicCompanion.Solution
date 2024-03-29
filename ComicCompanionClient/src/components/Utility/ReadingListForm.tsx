import { useSelector, useDispatch } from "react-redux";
import { currentListSelector, isCreatingSelector } from "../../redux/store";
import { updateProperty, toggleCreating, setCurrentList } from "../../redux/listCreationSlice";
import { toggleModal, setContent } from "../../redux/modalSlice";
import { Button, Switch, TextField } from "@mui/material";

import { useEffect, useState } from "react";
import defaultList from "../../helpers/defaultReadingList";

import { userSelector } from "../../redux/store";

import { useNavigate } from "react-router-dom";
import { errorAlert } from "../../helpers/alertCreators";

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

    dispatch(setContent({ type: "Finalize Reading List" }));
    dispatch(toggleModal(true));
  };

  const handleCancelCreation = () => {
    nav(-1);
    dispatch(setCurrentList(null));
    dispatch(toggleCreating(false));
  };

  const handleSignInAlert = () => {
    errorAlert(dispatch, "You Must Sign In To Share Reading Lists");
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
              inputProps={{ maxLength: 50 }}
              onChange={(e) => handleUpdateProperty("name", e.target.value)}
            />
            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="standard"
              inputProps={{ maxLength: 250 }}
              value={list.description}
              error={listDescriptionError}
              onChange={(e) => handleUpdateProperty("description", e.target.value)}
            />
            <div>
              {currentUser ? (
                <label>
                  <Switch onChange={(e) => handleUpdateProperty("shared", e.target.checked)} checked={list.shared} disabled={false} />
                  Share
                </label>
              ) : (
                <label onClick={handleSignInAlert}>
                  <Switch disabled={true} />
                  Share
                </label>
              )}
            </div>
            {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : <></>}

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Confirm
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
