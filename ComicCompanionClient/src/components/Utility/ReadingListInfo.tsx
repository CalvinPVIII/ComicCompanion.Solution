import { useState } from "react";
import { CurrentlyCreatedReadingList, ReadingListDto } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Button, Modal } from "@mui/material";
import comicCompanionImages from "../../helpers/defaultImageArray";
import IssuesList from "./IssuesList";

import { useSelector } from "react-redux";
import { userSelector } from "../../redux/store";
import "../../styles/ReadingListInfo.css";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toggleCreating, setCurrentList } from "../../redux/listCreationSlice";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AddIcon from "@mui/icons-material/Add";
import AddToLibraryModal from "./AddToLibraryModal";

interface ReadingListInfoProps {
  readingList: ReadingListDto;
  userInfo?: ReadingListUserInfo | null;
  rateReadingList?: (rating: boolean) => void;
}

type ReadingListUserInfo = {
  favorite: boolean;
  rating: boolean | null;
};

export default function ReadingListInfo(props: ReadingListInfoProps) {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);
  const [libraryModal, setLibraryModal] = useState(false);
  const openLibraryModal = () => setLibraryModal(true);
  const closeLibraryModal = () => setLibraryModal(false);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(userSelector);

  const handleEditClick = (readingList: ReadingListDto) => {
    const list: CurrentlyCreatedReadingList = {
      name: readingList.name,
      description: readingList.description,
      coverImg: readingList.coverImg,
      userId: readingList.userId,
      shared: readingList.shared,
      issues: readingList.issues || [],
      readingListId: readingList.readingListId,
    };

    dispatch(setCurrentList(list));
    dispatch(toggleCreating(true));
    nav("/lists/new");
  };

  const toggleConfirmDeleteModal = () => {
    setConfirmDeleteModalOpen(!confirmDeleteModalOpen);
  };

  const handleDeleteReadingList = async (readingListId: number | string) => {
    try {
      if (!currentUser) return;
      const result = await ComicCompanionAPIService.deleteReadingList(readingListId, currentUser.token);
      if (result) {
        toggleConfirmDeleteModal();
        nav("/");
      }
    } catch (e) {
      const error = getErrorMessage(e);
      console.log(error);
    }
  };

  return (
    <>
      <>
        <AddToLibraryModal open={libraryModal} setClose={closeLibraryModal} readingListOrComic="readingList" itemInfo={props.readingList} />
        <div className="list-info">
          {props.readingList.coverImg ? (
            <img src={props.readingList.coverImg} alt={props.readingList.name} />
          ) : (
            <img src={comicCompanionImages[0]} alt={props.readingList.name} />
          )}
          <div className="list-info-bottom-section">
            <p id="list-info-header">{props.readingList.name}</p>

            <div id="rating-buttons">
              <div className="add-to-library-button" onClick={openLibraryModal}>
                <AddIcon />
              </div>
              {props.rateReadingList ? (
                <>
                  <div className="rating-button-content">
                    {props.userInfo?.rating ? (
                      <>
                        <ThumbUpIcon color="success" onClick={() => props.rateReadingList?.(true)} />
                        <span className="rating-number active-like">{props.readingList?.likes}</span>
                      </>
                    ) : (
                      <>
                        <ThumbUpOutlinedIcon className="secondary-button" onClick={() => props.rateReadingList?.(true)} />
                        <span className="rating-number secondary-button">{props.readingList?.likes}</span>
                      </>
                    )}
                  </div>

                  <div className="rating-button-content">
                    {props.userInfo?.rating === false ? (
                      <>
                        <ThumbDownIcon color="error" onClick={() => props.rateReadingList?.(false)} />
                        <span className="rating-number active-dislike">{props.readingList?.dislikes}</span>
                      </>
                    ) : (
                      <>
                        <ThumbDownOutlinedIcon className="secondary-button" onClick={() => props.rateReadingList?.(false)} />
                        <span className="rating-number secondary-button">{props.readingList?.dislikes}</span>
                      </>
                    )}
                  </div>
                </>
              ) : null}
            </div>

            <p id="list-info-author">Created by {props.readingList.createdBy}</p>
            <p id="list-info-description">{props.readingList.description}</p>
            {currentUser?.userId === props.readingList.userId ? (
              <>
                <Modal open={confirmDeleteModalOpen} onClose={toggleConfirmDeleteModal}>
                  <div id="confirm-delete-modal">
                    <h2>Are you sure you want to delete this reading list?</h2>
                    <Button variant="contained" color="error" onClick={() => handleDeleteReadingList(props.readingList.readingListId)}>
                      Delete
                    </Button>
                    <p onClick={toggleConfirmDeleteModal}>Cancel</p>
                  </div>
                </Modal>
                <Button variant="outlined" size="small" color="success" onClick={() => handleEditClick(props.readingList)}>
                  Edit
                </Button>
                <Button variant="outlined" size="small" color="error" onClick={toggleConfirmDeleteModal}>
                  Delete
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <IssuesList issues={props.readingList.issues} showComicNames={true} />
      </>
    </>
  );
}
