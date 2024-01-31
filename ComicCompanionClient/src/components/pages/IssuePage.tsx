import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Issue } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert, Slider } from "@mui/material";
useParams;
import "../../styles/IssuePage.css";
import Loading from "../Utility/Loading";

import { useSelector } from "react-redux";
import { currentPlaylistSelector } from "../../redux/store";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

export default function IssuePage() {
  const { comicId, issueId } = useParams();
  const nav = useNavigate();

  const [apiResponse, setApiResponse] = useState<Issue | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const [pageMenuVisible, setPageMenuVisible] = useState<boolean>(false);

  const [overlaySticky, setOverlaySticky] = useState<"sticky" | "none">("none");

  const [overlayClass, setOverlayClass] = useState("fade-out");

  const [currentPage, setCurrentPage] = useState(0);

  const currentPlaylist = useSelector(currentPlaylistSelector);
  const [playlistIssueInfo, setPlaylistIssueInfo] = useState({ next: 0, prev: 0, current: 0 });

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
    if (apiResponse) {
      const indexOfCurrentIssue = currentPlaylist.findIndex((issue) => issue.comicId + issue.issueId === apiResponse?.comicId + apiResponse?.issueId);
      console.log(indexOfCurrentIssue);
      const newPlaylistInfo = { next: indexOfCurrentIssue, prev: indexOfCurrentIssue, current: indexOfCurrentIssue };
      if (currentPlaylist[indexOfCurrentIssue + 1]) {
        newPlaylistInfo.next = indexOfCurrentIssue + 1;
      }
      if (currentPlaylist[indexOfCurrentIssue - 1]) {
        newPlaylistInfo.prev = indexOfCurrentIssue - 1;
      }
      setPlaylistIssueInfo(newPlaylistInfo);
    }
  }, [apiResponse]);

  const handleMoveToNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    if (apiResponse && apiResponse.pages) {
      if (nextPage === apiResponse?.pages?.length + 1) {
        setCurrentPage(0);
        nav(`/comics/${currentPlaylist[playlistIssueInfo.next].comicId}/issue/${currentPlaylist[playlistIssueInfo.next].issueId}`);
      }
    }
  };

  const handleMoveToPreviousPage = () => {
    const nextPage = currentPage - 1;
    setCurrentPage(nextPage);

    if (nextPage === -2) {
      setCurrentPage(0);
      nav(`/comics/${currentPlaylist[playlistIssueInfo.prev].comicId}/issue/${currentPlaylist[playlistIssueInfo.prev].issueId}`);
    }
  };

  const handleMiddlePageClick = () => {
    if (overlaySticky === "sticky") {
      setOverlaySticky("none");
      toggleOverlay();
    } else {
      setOverlaySticky("sticky");
      toggleOverlay();
    }
  };

  const handleSlider = (event: Event, newValue: number | number[]) => {
    setCurrentPage((newValue as number) - 1);
  };

  const handleMouseEnter = () => {
    if (overlaySticky !== "sticky") {
      toggleOverlay();
    }
  };
  const handelMouseLeave = () => {
    if (overlaySticky !== "sticky") {
      toggleOverlay();
    }
  };

  const toggleOverlay = () => {
    if (!pageMenuVisible) {
      setOverlayClass("fade-in");
      setTimeout(() => {
        setPageMenuVisible(true);
      }, 200);
    } else {
      setOverlayClass("fade-out");
      setTimeout(() => {
        setPageMenuVisible(false);
      }, 200);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <Alert severity="error">{error}</Alert>
      ) : apiResponse && apiResponse.pages ? (
        <>
          {pageMenuVisible ? (
            <div className={`page-header ${overlayClass}`}>
              <Link to={`/comics/${comicId}`} id="back-icon">
                <ArrowBackIcon />
              </Link>
              <p>
                {apiResponse.comicId} - {apiResponse.issueId}
              </p>
              <p></p>
            </div>
          ) : (
            <></>
          )}

          <div className="page-wrapper">
            <div className="page-left" onClick={handleMoveToPreviousPage}></div>
            <div className="page-middle" onClick={handleMiddlePageClick}></div>
            <div className="page-right" onClick={handleMoveToNextPage}></div>
            {currentPage + 1 > apiResponse.pages.length ? (
              <h1>NEXT ISSUE</h1>
            ) : currentPage - 1 === -2 ? (
              <h1>PREV ISSUE</h1>
            ) : (
              <img
                className={`page`}
                src={apiResponse.pages[currentPage]}
                alt={`${apiResponse.comicId} issue ${apiResponse.issueId} page ${currentPage}`}
              />
            )}
          </div>
          <div className={`page-navbar-wrapper ${overlayClass}`} onMouseEnter={handleMouseEnter} onMouseLeave={handelMouseLeave}>
            {pageMenuVisible ? (
              <>
                <div className="page-navbar">
                  <p className="slider-number">
                    <ArrowBackIosIcon onClick={handleMoveToPreviousPage} />
                    {currentPage + 1}
                  </p>
                  <div id="slider-wrapper">
                    <Slider
                      min={1}
                      max={apiResponse.pages.length}
                      step={1}
                      valueLabelDisplay="auto"
                      marks
                      value={currentPage + 1}
                      onChange={handleSlider}
                      id="page-slider"
                    />
                  </div>
                  <p className="slider-number">
                    {apiResponse.pages.length} <ArrowForwardIosIcon onClick={handleMoveToNextPage} />
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
