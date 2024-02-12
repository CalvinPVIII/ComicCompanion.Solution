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
import { readingListCreationError } from "../helpers/alertCreators";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

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

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const toggleIsEditingName = () => setIsEditingName(!isEditingName);
  const toggleIsEditingDesc = () => setIsEditingDesc(!isEditingDesc);

  const handleEditListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProperty({ propertyName: "name", value: e.target.value }));
  };

  const handleEditListDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProperty({ propertyName: "description", value: e.target.value }));
  };

  const handleTogglePrivate = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProperty({ propertyName: "isPrivate", value: e.target.checked }));
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
    if (readingList.issues.length <= 0) {
      readingListCreationError(dispatch, "Reading List Must Have Issues");
      readingListCreationError(dispatch, "Reading List Must Have Issues");
      return true;
    }
    if (readingList.name.length <= 0) {
      readingListCreationError(dispatch, "Name Cannot Be Blank");

      return true;
    }
    if (readingList.description.length <= 0) {
      readingListCreationError(dispatch, "Description Cannot Be Blank");

      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    console.log(readingList);
    const errors = errorChecker();
    if (errors) return;
    if (!readingList || !currentUser) return;

    const list: UserReadingListPostRequest = {
      readingListId: readingList.readingListId || 0,
      serializedIssues: JSON.stringify(readingList.issues),
      isPrivate: readingList.isPrivate,
      userId: currentUser.userId,
      name: readingList.name,
      description: readingList.description,
      coverImg: readingList.coverImg || comicCompanionImages[defaultImageIndex],
    };
    let response;
    if (readingList.readingListId !== 0) {
      response = await ComicCompanionAPIService.postReadingList(list, currentUser.token, "PUT");
    } else {
      response = await ComicCompanionAPIService.postReadingList(list, currentUser.token, "POST");
    }

    if (response.status === "success") {
      nav(`/lists/${response.data.readingListId}`);
      dispatch(setCurrentList(null));
      dispatch(toggleCreating(false));
      dispatch(toggleModal(false));
    }
    console.log(readingList);
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

  if (readingList) {
    return (
      <div id="confirm-reading-list-modal">
        {isEditingName ? (
          <div id="edit-name">
            <TextField value={readingList.name} onChange={handleEditListName} autoFocus inputProps={{ maxLength: 50 }} />

            <CheckIcon onClick={toggleIsEditingName} color="success" />
          </div>
        ) : (
          <h1 onClick={toggleIsEditingName} style={{ cursor: "pointer" }}>
            {readingList.name}{" "}
            <span>
              <EditIcon />
            </span>
          </h1>
        )}

        <div id="confirm-basic-info">
          <div id="preview-img">
            {readingList.coverImg ? (
              <img src={readingList.coverImg} alt="cover image" id="reading-list-cover-image" onClick={toggleDefaultImage} />
            ) : (
              <img src={comicCompanionImages[defaultImageIndex]} alt="cover image" id="reading-list-cover-image" onClick={toggleDefaultImage} />
            )}
            <p id="img-helper-text">Tap an issue to change the cover image</p>
          </div>
          {isEditingDesc ? (
            <div id="edit-desc">
              <TextField value={readingList.description} onChange={handleEditListDesc} autoFocus multiline inputProps={{ maxLength: 250 }} />
              <Button onClick={toggleIsEditingDesc}>Confirm</Button>
            </div>
          ) : (
            <div id="preview-description" onClick={toggleIsEditingDesc}>
              <p>{readingList.description}</p>
              <Button>Edit</Button>
            </div>
          )}
        </div>
        <div id="private-toggle">
          <label>
            <Switch onChange={handleTogglePrivate} checked={readingList.isPrivate} />
            Private
          </label>
        </div>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <span id="accordion-header">Issues</span>
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
