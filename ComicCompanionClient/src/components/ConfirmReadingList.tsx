import "../styles/ConfirmReadingList.css";
import { useSelector } from "react-redux";
import { currentListSelector, userSelector } from "../redux/store";
import { Button, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
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

  const handleSubmit = async () => {
    console.log(readingList);
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
    } else {
      setDefaultImageIndex(defaultImageIndex + 1);
    }
  };

  const handleCancel = () => {
    dispatch(toggleModal(false));
  };

  if (readingList) {
    return (
      <div id="confirm-reading-list-modal">
        <h1>{readingList.name}</h1>
        <span id="confirm-desc">
          <p>{readingList.description}</p>
        </span>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <span id="accordion-header">Confirm Issues</span>
          </AccordionSummary>
          <AccordionDetails>
            <p id="cover-image-info">Tap an issue to set the cover image</p>
            <div id="cover-image-picker">
              <div id="confirm-issues-list">
                <IssuesInCreatingReadingList onClickCallback={handleIssueClick} />
              </div>

              {readingList.coverImg ? (
                <img src={readingList.coverImg} alt="cover image" id="reading-list-cover-image" />
              ) : (
                <img src={comicCompanionImages[defaultImageIndex]} alt="cover image" id="reading-list-cover-image" onClick={toggleDefaultImage} />
              )}
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
