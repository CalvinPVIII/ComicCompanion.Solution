import { useState, useEffect } from "react";
import { Comic } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import "../../styles/ComicInfo.css";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert, CircularProgress } from "@mui/material";
import IssuesList from "./IssuesList";
interface ComicInfoProps {
  comicId: string;
}

export default function ComicInfo(props: ComicInfoProps) {
  const [apiResult, setApiResult] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const comic = await ComicCompanionAPIService.getComic(props.comicId);
        setApiResult(comic);
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
        <div className="comic-info">
          <h1>{apiResult.name}</h1>
          <img src={apiResult.coverImg} alt={apiResult.name} />
          <IssuesList comicId={props.comicId} issues={apiResult.issueIds} />
        </div>
      ) : !loading && error ? (
        <>
          <Alert severity="error">{error} </Alert>
        </>
      ) : loading ? (
        <CircularProgress size="100px" />
      ) : (
        <></>
      )}
    </>
  );
}
