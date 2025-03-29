import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Chapter } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert, Slider } from "@mui/material";
useParams;
import "../../styles/IssuePage.css";
import Loading from "../Utility/Loading";

import { useSelector, useDispatch } from "react-redux";
import { updateHistory, updateReadingListHistory } from "../../redux/readingHistorySlice";
import { currentPlaylistSelector, readingHistorySelector } from "../../redux/store";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";
import IssueImage from "../Utility/IssueImg";
import IssueImgPageControls from "../Utility/IssueImgPageControls";
import ImgCache from "../Utility/ImgCache";

export default function IssuePage() {
  const { comicId, issueId, listId } = useParams();
  const location = useLocation();

  const nav = useNavigate();
  const dispatch = useDispatch();
  const readingHistory = useSelector(readingHistorySelector);

  const [apiResponse, setApiResponse] = useState<Chapter | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const stopImgLoading = () => setImgLoading(false);
  const startImgLoading = () => setImgLoading(true);

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
        setLoading(true);
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

  useEffect(() => {
    if (apiResponse) {
      const indexOfCurrentIssue = currentPlaylist.findIndex((issue) => issue.id === apiResponse?.id);
      const newPlaylistInfo = { next: indexOfCurrentIssue, prev: indexOfCurrentIssue, current: indexOfCurrentIssue };
      if (currentPlaylist[indexOfCurrentIssue + 1]) {
        newPlaylistInfo.next = indexOfCurrentIssue + 1;
      }
      if (currentPlaylist[indexOfCurrentIssue - 1]) {
        newPlaylistInfo.prev = indexOfCurrentIssue - 1;
      }
      setPlaylistIssueInfo(newPlaylistInfo);
    }
  }, [apiResponse, currentPlaylist]);

  const handleArrowKeys = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      handleMoveToPreviousPage();
    } else if (event.key === "ArrowRight") {
      handleMoveToNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleArrowKeys);

    return () => {
      window.removeEventListener("keydown", handleArrowKeys);
    };
  });
  const handleUpdateHistory = (pageNumber: number) => {
    if (!readingHistory.paused) {
      if (apiResponse?.pages && pageNumber <= apiResponse.pages && apiResponse.images) {
        dispatch(
          updateHistory({
            issue: { comicId: apiResponse.comicId, issueId: apiResponse.id, cover: apiResponse.images[0], issueName: apiResponse.title },
            completed: pageNumber >= apiResponse.pages - 2,
            pagesRead: pageNumber,
          })
        );
        if (listId) {
          dispatch(
            updateReadingListHistory({
              listId: listId,
              comicId: apiResponse.comicId,
              issueId: apiResponse.id,
              pagesRead: pageNumber,
              coverImg: apiResponse.images[0],
              completed: pageNumber >= apiResponse.pages - 2,
              issueName: apiResponse.title,
            })
          );
        }
      }
    }
  };

  const handleMoveToNextPage = () => {
    const currentRoute = location.pathname;
    const nextPage = currentPage + 1;
    handleUpdateHistory(nextPage);
    setImgLoading(true);
    setCurrentPage(nextPage);
    if (apiResponse && apiResponse.pages) {
      if (nextPage === apiResponse.pages + 1) {
        setCurrentPage(0);
        if (listId) {
          nav(
            `/lists/${currentRoute.includes("/lists/local") ? "local/" : "shared/"}${listId}/comics/${
              currentPlaylist[playlistIssueInfo.next].comicId
            }/issue/${currentPlaylist[playlistIssueInfo.next].id}`
          );
        } else {
          nav(`/comics/${currentPlaylist[playlistIssueInfo.next].comicId}/issue/${currentPlaylist[playlistIssueInfo.next].id}`);
        }
      }
    }
  };

  const handleMoveToPreviousPage = () => {
    const nextPage = currentPage - 1;
    setCurrentPage(nextPage);
    setImgLoading(true);
    const currentRoute = location.pathname;

    if (nextPage === -2) {
      setCurrentPage(0);

      if (listId) {
        nav(
          `/lists/${currentRoute.includes("/lists/local") ? "local/" : "shared/"}${listId}/comics/${
            currentPlaylist[playlistIssueInfo.prev].comicId
          }/issue/${currentPlaylist[playlistIssueInfo.prev].id}`
        );
      } else {
        nav(`/comics/${currentPlaylist[playlistIssueInfo.prev].comicId}/issue/${currentPlaylist[playlistIssueInfo.prev].id}`);
      }
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

  const handleSlider = (_: Event, newValue: number | number[]) => {
    setCurrentPage((newValue as number) - 1);
    setImgLoading(true);
    handleUpdateHistory((newValue as number) - 1);
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

  const handleBackButton = () => {
    const currentRoute = location.pathname;
    if (listId) {
      if (currentRoute.includes("/lists/local")) {
        nav(`/lists/local/${listId}`);
      } else {
        nav(`/lists/shared/${listId}`);
      }
    } else {
      nav(`/comics/${comicId}`);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <Alert severity="error">{error}</Alert>
      ) : apiResponse && apiResponse.images ? (
        <>
          <div className="page-header-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handelMouseLeave}>
            {pageMenuVisible ? (
              <div className={`page-header ${overlayClass}`}>
                <p style={{ cursor: "pointer" }}>
                  <ArrowBackIcon onClick={handleBackButton} />
                </p>

                <p>{apiResponse.title}</p>
                <p className="spacer"></p>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="page-wrapper">
            {currentPage + 1 > apiResponse.pages ? (
              <>
                <IssueImgPageControls
                  leftCallback={handleMoveToPreviousPage}
                  middleCallback={handleMiddlePageClick}
                  rightCallback={handleMoveToNextPage}
                />
                <div className="next-issue-info">
                  {currentPlaylist[playlistIssueInfo.next] === currentPlaylist[playlistIssueInfo.current] ? (
                    <h1>No Next Issue</h1>
                  ) : (
                    <>
                      <h1>Next issue:</h1>
                      <h2>{currentPlaylist[playlistIssueInfo.next].title}</h2>
                    </>
                  )}
                </div>
              </>
            ) : currentPage - 1 === -2 ? (
              <>
                <IssueImgPageControls
                  leftCallback={handleMoveToPreviousPage}
                  middleCallback={handleMiddlePageClick}
                  rightCallback={handleMoveToNextPage}
                />
                <div className="next-issue-info">
                  {currentPlaylist[playlistIssueInfo.prev] === currentPlaylist[playlistIssueInfo.current] ? (
                    <h1>No Prev Issue</h1>
                  ) : (
                    <>
                      <h1>Next issue:</h1>
                      <h2>{currentPlaylist[playlistIssueInfo.prev].title}</h2>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <ImgCache img={apiResponse.images[currentPage + 1]} />
                <IssueImage
                  alt={`${apiResponse.title} page ${currentPage}`}
                  img={apiResponse.images[currentPage]}
                  leftCallback={handleMoveToPreviousPage}
                  middleCallback={handleMiddlePageClick}
                  rightCallback={handleMoveToNextPage}
                  imgLoading={imgLoading}
                  loadEndCallback={stopImgLoading}
                  loadStartCallback={startImgLoading}
                />
              </>
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
                      max={apiResponse.pages}
                      step={1}
                      valueLabelDisplay="auto"
                      marks
                      value={currentPage + 1}
                      onChange={handleSlider}
                      id="page-slider"
                    />
                  </div>
                  <p className="slider-number">
                    {apiResponse.pages} <ArrowForwardIosIcon onClick={handleMoveToNextPage} />
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
