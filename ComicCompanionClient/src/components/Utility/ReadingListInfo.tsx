import { useState, useEffect } from "react";
import { CurrentlyCreatedReadingList, ReadingListDto } from "../../types";
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

interface ReadingListInfoProps {
  listId: string;
}

export default function ReadingListInfo(props: ReadingListInfoProps) {
  const [apiResult, setApiResult] = useState<ReadingListDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const readingList = await ComicCompanionAPIService.getReadingList(props.listId);
        if (readingList.status === "error") {
          throw new Error(readingList.data as unknown as string);
        }
        setApiResult(readingList.data);
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
          <div className="list-info">
            {apiResult.coverImg ? <img src={apiResult.coverImg} alt={apiResult.name} /> : <img src={comicCompanionImages[0]} alt={apiResult.name} />}
            <div>
              <p id="list-info-header">{apiResult.name}</p>
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
