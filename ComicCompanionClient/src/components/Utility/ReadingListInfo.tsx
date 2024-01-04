import { useState, useEffect } from "react";
import { ReadingListDto } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert, CircularProgress } from "@mui/material";
import comicCompanionImages from "../../helpers/defaultImageArray";

interface ReadingListInfoProps {
  listId: string;
}

export default function ReadingListInfo(props: ReadingListInfoProps) {
  const [apiResult, setApiResult] = useState<ReadingListDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <div className="list-info">
          {apiResult.coverImg ? <img src={apiResult.coverImg} alt={apiResult.name} /> : <img src={comicCompanionImages[0]} alt={apiResult.name} />}
          <div>
            <p>{apiResult.name}</p>
            <p>{apiResult.createdBy}</p>
            <p>{apiResult.description}</p>
            {apiResult.issues?.map((issue, index) => (
              <p key={index}>
                {issue.comicId} - {issue.issueId}
              </p>
            ))}
          </div>
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
