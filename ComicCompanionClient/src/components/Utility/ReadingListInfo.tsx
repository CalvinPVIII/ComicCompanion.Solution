import { useState, useEffect } from "react";
import { CurrentlyCreatedReadingList, ReadingListAPIResponse, ReadingListDto, ReadingListWithUserInfoAPIResponse } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert, Button, Modal } from "@mui/material";
import comicCompanionImages from "../../helpers/defaultImageArray";
import Loading from "./Loading";
import IssuesList from "./IssuesList";

import { useSelector } from "react-redux";
import { userSelector } from "../../redux/store";
import "../../styles/ReadingListInfo.css";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toggleCreating, setCurrentList } from "../../redux/listCreationSlice";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AddIcon from "@mui/icons-material/Add";
import AddToLibraryModal from "./AddToLibraryModal";
interface ReadingListInfoProps {
  listId: string;
}

type ReadingListUserInfo = {
  favorite: boolean;
  rating: boolean | null;
};

export default function ReadingListInfo(props: ReadingListInfoProps) {
  const [apiResult, setApiResult] = useState<ReadingListDto | null>(null);
  const [userInfo, setUserInfo] = useState<ReadingListUserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      isPrivate: readingList.isPrivate,
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

  const handleDeleteReadingList = async (readingListId: number) => {
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

  const handleToggleFavorite = async () => {
    if (!currentUser || !userInfo || !apiResult) return;
    if (currentUser.userId === apiResult.userId) {
      // alert popup
      return;
    }
    const response = await ComicCompanionAPIService.favoriteReadingList(apiResult.readingListId, currentUser.token);
    if (response.data === "Favorite Added") {
      setUserInfo({ ...userInfo, favorite: true });
    } else if (response.data === "Favorite Removed") {
      setUserInfo({ ...userInfo, favorite: false });
    }
  };

  const handleRateReadingList = async (rating: boolean) => {
    if (!currentUser || !apiResult || !userInfo) return;
    if (currentUser.userId === apiResult.userId) {
      // alert popup
      return;
    }
    const response = await ComicCompanionAPIService.rateReadingList(apiResult.readingListId, rating, currentUser.token);
    if (userInfo.rating === rating) {
      setUserInfo({ ...userInfo, rating: null });
    } else {
      setUserInfo({ ...userInfo, rating: rating });
    }
    setApiResult(response.data.content);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let readingList = await ComicCompanionAPIService.getReadingList(props.listId, currentUser?.token);
        if (readingList.status === "error") {
          throw new Error(readingList.data as unknown as string);
        }
        if (currentUser) {
          readingList = readingList as ReadingListWithUserInfoAPIResponse;
          setApiResult(readingList.data.list);
          setUserInfo(readingList.data.userInfo);
        } else {
          readingList = readingList as ReadingListAPIResponse;
          setApiResult(readingList.data);
        }
        console.log(apiResult);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
      setLoading(false);
    };
    getData();
  }, [props.listId]);

  return (
    <>
      {!loading && apiResult ? (
        <>
          <AddToLibraryModal open={libraryModal} setClose={closeLibraryModal} readingListOrComic="readingList" itemInfo={apiResult} />
          <div className="list-info">
            {apiResult.coverImg ? <img src={apiResult.coverImg} alt={apiResult.name} /> : <img src={comicCompanionImages[0]} alt={apiResult.name} />}
            <div className="list-info-bottom-section">
              <p id="list-info-header">{apiResult.name}</p>

              <div id="rating-buttons">
                <div className="add-to-library-button" onClick={openLibraryModal}>
                  <AddIcon />
                </div>
                {userInfo?.favorite ? (
                  <StarIcon onClick={handleToggleFavorite} color="primary" />
                ) : (
                  <StarOutlineIcon onClick={handleToggleFavorite} className="secondary-button" />
                )}

                <div className="rating-button-content">
                  {userInfo?.rating ? (
                    <>
                      <ThumbUpIcon color="success" onClick={() => handleRateReadingList(true)} />
                      <span className="rating-number active-like">{apiResult?.likes}</span>
                    </>
                  ) : (
                    <>
                      <ThumbUpOutlinedIcon className="secondary-button" onClick={() => handleRateReadingList(true)} />
                      <span className="rating-number secondary-button">{apiResult?.likes}</span>
                    </>
                  )}
                </div>

                <div className="rating-button-content">
                  {userInfo?.rating === false ? (
                    <>
                      <ThumbDownIcon color="error" onClick={() => handleRateReadingList(false)} />
                      <span className="rating-number active-dislike">{apiResult?.dislikes}</span>
                    </>
                  ) : (
                    <>
                      <ThumbDownOutlinedIcon className="secondary-button" onClick={() => handleRateReadingList(false)} />
                      <span className="rating-number secondary-button">{apiResult?.dislikes}</span>
                    </>
                  )}
                </div>
              </div>

              <p id="list-info-author">Created by {apiResult.createdBy}</p>
              <p id="list-info-description">{apiResult.description}</p>
              {currentUser?.userId === apiResult.userId ? (
                <>
                  <Modal open={confirmDeleteModalOpen} onClose={toggleConfirmDeleteModal}>
                    <div id="confirm-delete-modal">
                      <h2>Are you sure you want to delete this reading list?</h2>
                      <Button variant="contained" color="error" onClick={() => handleDeleteReadingList(apiResult.readingListId)}>
                        Delete
                      </Button>
                      <p onClick={toggleConfirmDeleteModal}>Cancel</p>
                    </div>
                  </Modal>
                  <Button variant="outlined" size="small" color="success" onClick={() => handleEditClick(apiResult)}>
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

          <IssuesList issues={apiResult.issues} showComicNames={true} />
        </>
      ) : !loading && error ? (
        <>
          <Alert severity="error">{error} </Alert>
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <></>
      )}
    </>
  );
}
