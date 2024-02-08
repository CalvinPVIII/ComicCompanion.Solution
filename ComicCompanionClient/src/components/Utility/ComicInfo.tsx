import { useState, useEffect } from "react";
import { Comic, Issue } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import "../../styles/ComicInfo.css";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert } from "@mui/material";
import IssuesList from "./IssuesList";
import Loading from "./Loading";
import AddIcon from "@mui/icons-material/Add";
import AddToLibraryModal from "./AddToLibraryModal";
interface ComicInfoProps {
  comicId: string;
}

export default function ComicInfo(props: ComicInfoProps) {
  const [apiResult, setApiResult] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [issuesArray, setIssuesArray] = useState<Issue[] | null>(null);
  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const openLibraryModel = () => setLibraryModalOpen(true);
  const closeLibraryModel = () => setLibraryModalOpen(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const comic = await ComicCompanionAPIService.getComic(props.comicId);
        setApiResult(comic);
        const issuesArray: Issue[] = comic.issueIds?.map((issueId) => {
          return { comicId: comic.comicId, issueId: issueId };
        }) as Issue[];
        setIssuesArray(issuesArray);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
      setLoading(false);
    };
    getData();
  }, [props.comicId]);
  return (
    <>
      {!loading && apiResult ? (
        <>
          <AddToLibraryModal open={libraryModalOpen} setClose={closeLibraryModel} itemInfo={apiResult} readingListOrComic="comic" />
          <div className="comic-info">
            <h1>{apiResult.name}</h1>
            <img src={apiResult.coverImg} alt={apiResult.name} />
            <div id="add-to-library-icon" onClick={openLibraryModel}>
              <AddIcon />
              <p>Add to library</p>
            </div>
            <IssuesList showComicNames={false} issues={issuesArray} />
          </div>
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
