import { useState, useEffect, useRef } from "react";
import { Comic, Issue } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import "../../styles/ComicInfo.css";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert, Tab, Tabs } from "@mui/material";
import IssuesList from "./IssuesList";
import Loading from "./Loading";
import AddIcon from "@mui/icons-material/Add";
import AddToLibraryModal from "./AddToLibraryModal";
import { useSelector, useDispatch } from "react-redux";
import { comicInfoCacheSelector } from "../../redux/store";
import { setComicInCache } from "../../redux/comicInfoCacheSlice";
import { areSameDay } from "../../helpers/helperFunctions";
import ChaptersList from "./ChaptersList";
import VerticalIssueList from "../v2/Utility/VerticalIssueList";
import ColorThief from "colorthief";
interface ComicInfoProps {
  comicId: string;
}

export default function ComicInfo(props: ComicInfoProps) {
  const [apiResult, setApiResult] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTab, setCurrentTab] = useState<number>(1);

  const [issuesArray, setIssuesArray] = useState<Issue[] | null>(null);
  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const openLibraryModel = () => setLibraryModalOpen(true);
  const closeLibraryModel = () => setLibraryModalOpen(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const comicInfoCache = useSelector(comicInfoCacheSelector);
  const dispatch = useDispatch();

  const handleTabChange = (_event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const refreshComic = async () => {
    setLoading(true);
    try {
      const comic = await ComicCompanionAPIService.getComic(props.comicId);
      setComicInfo(comic);
      dispatch(setComicInCache(comic));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    }
    setLoading(false);
  };

  const setComicInfo = (comic: Comic) => {
    setApiResult(comic);
    const issuesArray: Issue[] = comic.issueIds?.map((issueId) => {
      return { comicId: comic.comicId, issueId: issueId };
    }) as Issue[];
    setIssuesArray(issuesArray);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let comic;
        const comicInCache = comicInfoCache[props.comicId];
        if (comicInCache) {
          if (comicInCache.data.status === "Completed") {
            comic = comicInCache.data;
          }
          if (areSameDay(comicInCache.lastFetched, new Date().toISOString())) {
            comic = comicInCache.data;
          }
        }

        if (!comic) {
          comic = await ComicCompanionAPIService.getComic(props.comicId);
        }
        dispatch(setComicInCache(comic));
        setComicInfo(comic);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
      setLoading(false);
    };
    getData();
  }, [props.comicId]);

  useEffect(() => {}, []);

  return (
    <>
      {!loading && apiResult ? (
        <div className="mx-auto max-w-prose">
          <AddToLibraryModal open={libraryModalOpen} setClose={closeLibraryModel} itemInfo={apiResult} readingListOrComic="comic" />
          <div className="max-w-screen-lg">
            <div className="md:grid md:grid-cols-3 md:grid-rows-1 border-b py-12 flex flex-col items-center">
              <img referrerPolicy="no-referrer" src={apiResult.coverImg} alt={apiResult.name} id="comic-cover" ref={imgRef} className="max-w-80" />
              <div className="flex flex-col items-center justify-center  cursor-pointer ml-6 w-96 md:mb-12">
                <h1 className="font-bold text-2xl text-center">{apiResult.name}</h1>
                <div className="flex mt-4" onClick={openLibraryModel}>
                  <AddIcon />
                  <p>Add to library</p>
                </div>
              </div>
            </div>

            <Tabs onChange={handleTabChange} value={currentTab} textColor="secondary" indicatorColor="secondary" centered>
              <Tab label="Issues" value={1} />
              <Tab label="Description" value={2} />
            </Tabs>
            {currentTab === 1 ? <VerticalIssueList chapters={apiResult.chapters} comicId={apiResult.comicId} /> : <p>{apiResult.description}</p>}
          </div>
        </div>
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
