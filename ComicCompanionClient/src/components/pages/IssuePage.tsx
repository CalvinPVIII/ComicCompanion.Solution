import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Issue } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert } from "@mui/material";
useParams;
import "../../styles/IssuePage.css";
import Loading from "../Utility/Loading";

export default function IssuePage() {
  const { comicId, issueId } = useParams();

  const [apiResponse, setApiResponse] = useState<Issue | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [portraitOrLandscape, setPortraitOrLandscape] = useState<"portrait" | "landscape">("portrait");

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        if (comicId && issueId) {
          const issue = await ComicCompanionAPIService.getIssue(comicId, issueId);
          console.log(issue);
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

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    if (screenHeight > screenWidth) {
      setPortraitOrLandscape("portrait");
    } else {
      setPortraitOrLandscape("landscape");
    }
  }, [window.innerHeight, window.innerWidth]);

  const handleMoveToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  console.log(portraitOrLandscape);
  return (
    <>
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <Alert severity="error">{error}</Alert>
      ) : apiResponse && apiResponse.pages ? (
        <>
          <div className="page-wrapper">
            <img
              className={`${portraitOrLandscape}-page`}
              src={apiResponse.pages[currentPage]}
              alt={`${apiResponse.comicId} issue ${apiResponse.issueId} page ${currentPage}`}
              onClick={handleMoveToNextPage}
            />
          </div>
          {/* <div className="pages">
            {apiResponse?.pages?.map((page, index) => (
              <img src={page} key={index} className="issue-page" />
            ))}
          </div> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
