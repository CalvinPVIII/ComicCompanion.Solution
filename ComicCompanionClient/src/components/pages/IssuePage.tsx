import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Issue } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert, CircularProgress } from "@mui/material";
useParams;
import "../../styles/IssuePage.css";

export default function IssuePage() {
  const { comicId, issueId } = useParams();

  const [apiResponse, setApiResponse] = useState<Issue | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        if (comicId && issueId) {
          const issue = await ComicCompanionAPIService.getIssue(comicId, issueId);
          setApiResponse(issue);
        }
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
      setLoading(false);
    };
    getData();
  }, [comicId, issueId]);

  return (
    <>
      {loading ? (
        <CircularProgress size="100px" />
      ) : !loading && error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <div className="pages">
            {apiResponse?.pages?.map((page, index) => (
              <img src={page} key={index} className="issue-page" />
            ))}
          </div>
        </>
      )}
    </>
  );
}
