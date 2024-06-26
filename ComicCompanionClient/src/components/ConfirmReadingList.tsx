import "../styles/ConfirmReadingList.css";
import { useSelector } from "react-redux";
import { currentListSelector, userSelector } from "../redux/store";
import { Button, Accordion, AccordionDetails, AccordionSummary, TextField, Switch } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import IssuesInCreatingReadingList from "./Utility/IssuesInCreatingReadingList";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Issue, UserReadingListPostRequest } from "../types";

import { useDispatch } from "react-redux";
import { updateProperty } from "../redux/listCreationSlice";
import { toggleModal } from "../redux/modalSlice";
import { setCurrentList, toggleCreating } from "../redux/listCreationSlice";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import comicCompanionImages from "../helpers/defaultImageArray";
import { errorAlert } from "../helpers/alertCreators";
import { createLocalReadingList } from "../helpers/helperFunctions";

interface ImageCache {
  [issueId: string]: string[];
}

export default function ConfirmReadingList() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [loadedImages, setLoadedImages] = useState<ImageCache>({});
  const [defaultImageIndex, setDefaultImageIndex] = useState<number>(Math.floor(Math.random() * 6) + 1);

  const readingList = useSelector(currentListSelector);
  const currentUser = useSelector(userSelector);

  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [issuesError, setIssuesError] = useState(false);

  const handleEditListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProperty({ propertyName: "name", value: e.target.value }));
  };

  const handleEditListDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProperty({ propertyName: "description", value: e.target.value }));
  };

  const handleToggleShared = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProperty({ propertyName: "shared", value: e.target.checked }));
  };

  const handleIssueClick = async (issue: Issue) => {
    const id = issue.comicId + issue.issueId;
    if (loadedImages[id]) {
      dispatch(updateProperty({ value: loadedImages[id][0], propertyName: "coverImg" }));
    } else {
      const fetchedIssue = await ComicCompanionAPIService.getIssue(issue.comicId, issue.issueId);
      if (fetchedIssue.pages) {
        const newImageCache = { ...loadedImages };
        newImageCache[id] = fetchedIssue.pages;
        setLoadedImages(newImageCache);
        dispatch(updateProperty({ value: fetchedIssue.pages[0], propertyName: "coverImg" }));
      }
    }
  };

  const errorChecker = (): boolean => {
    if (!readingList) return true;
    if (readingList.name.length <= 0) {
      errorAlert(dispatch, "Name Cannot Be Blank");
      setNameError(true);
      return true;
    }
    if (readingList.description.length <= 0) {
      errorAlert(dispatch, "Description Cannot Be Blank");
      setDescError(true);
      return true;
    }
    if (readingList.issues.length <= 0) {
      errorAlert(dispatch, "Reading List Must Have Issues");
      errorAlert(dispatch, "Reading List Must Have Issues");
      setIssuesError(true);
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    setNameError(false);
    setDescError(false);
    setIssuesError(false);
    const errors = errorChecker();
    if (errors) return;
    if (!readingList) return;

    const list: UserReadingListPostRequest = {
      readingListId: readingList.readingListId || 0,
      serializedIssues: JSON.stringify(readingList.issues),
      shared: readingList.shared,
      userId: "local",
      name: readingList.name,
      description: readingList.description,
      coverImg: readingList.coverImg || comicCompanionImages[defaultImageIndex],
    };
    let response;
    // if you want to share the reading list
    if (list.shared && currentUser) {
      list.userId = currentUser.userId;
      if (list.readingListId !== 0) {
        // checks if the reading list was locally stored or not already
        if (typeof list.readingListId === "string") {
          list.readingListId = 0;
          response = await ComicCompanionAPIService.postReadingList(list, currentUser.token, "POST");
        } else {
          response = await ComicCompanionAPIService.postReadingList(list, currentUser.token, "PUT");
        }
      } else {
        response = await ComicCompanionAPIService.postReadingList(list, currentUser.token, "POST");
      }

      if (response.status === "success") {
        nav(`/lists/shared/${response.data.readingListId}`);
      }
      // if the reading list is local only
    } else {
      const response = createLocalReadingList(dispatch, list);
      nav(`/lists/local/${response.readingListId}`);
    }
    dispatch(setCurrentList(null));
    dispatch(toggleCreating(false));
    dispatch(toggleModal(false));
  };

  const toggleDefaultImage = () => {
    if (defaultImageIndex === 6) {
      setDefaultImageIndex(0);
      dispatch(updateProperty({ propertyName: "coverImg", value: comicCompanionImages[0] }));
    } else {
      setDefaultImageIndex(defaultImageIndex + 1);
      dispatch(updateProperty({ propertyName: "coverImg", value: comicCompanionImages[defaultImageIndex + 1] }));
    }
  };

  const handleCancel = () => {
    dispatch(toggleModal(false));
  };

  const handleSignInAlert = () => {
    errorAlert(dispatch, "You Must Sign In To Share Reading Lists");
  };

  if (readingList) {
    return (
      <div id="confirm-reading-list-modal">
        <h1>Confirm List</h1>

        <div id="confirm-basic-info">
          <div id="preview-img">
            {readingList.coverImg ? (
              <img src={readingList.coverImg} alt="cover image" id="reading-list-cover-image" onClick={toggleDefaultImage} />
            ) : (
              <img src={comicCompanionImages[defaultImageIndex]} alt="cover image" id="reading-list-cover-image" onClick={toggleDefaultImage} />
            )}
            <p id="img-helper-text">Tap an issue to change the cover image</p>
          </div>
          <div id="edit-desc">
            <p style={nameError ? { color: "red" } : {}}>Name:</p>
            <TextField value={readingList.name} onChange={handleEditListName} autoFocus inputProps={{ maxLength: 50 }} error={nameError} />
            <p style={descError ? { color: "red" } : {}}>Description:</p>
            <TextField
              value={readingList.description}
              onChange={handleEditListDesc}
              autoFocus
              multiline
              inputProps={{ maxLength: 250 }}
              rows={4}
              error={descError}
            />
          </div>
        </div>
        <div id="private-toggle">
          {currentUser ? (
            <label>
              <Switch onChange={handleToggleShared} checked={readingList.shared} disabled={false} />
              Share
            </label>
          ) : (
            <label onClick={handleSignInAlert}>
              <Switch disabled={true} />
              Share
            </label>
          )}
        </div>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <span id="accordion-header" style={issuesError ? { color: "red" } : {}}>
              Issues
            </span>
          </AccordionSummary>
          <AccordionDetails>
            <div id="cover-image-picker">
              <div id="confirm-issues-list">
                <IssuesInCreatingReadingList onClickCallback={handleIssueClick} />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <div id="confirm-buttons">
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Create
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
