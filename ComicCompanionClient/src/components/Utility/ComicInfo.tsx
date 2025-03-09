import { useState, useEffect, useRef } from "react";
import { Comic } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import "../../styles/ComicInfo.css";
import { getErrorMessage } from "../../helpers/helperFunctions";
import { Alert, Button } from "@mui/material";
import Loading from "./Loading";
import AddIcon from "@mui/icons-material/Add";
import AddToLibraryModal from "./AddToLibraryModal";
import { useSelector, useDispatch } from "react-redux";
import { comicInfoCacheSelector } from "../../redux/store";
import { setComicInCache } from "../../redux/comicInfoCacheSlice";
import { areSameDay } from "../../helpers/helperFunctions";
import VerticalIssueList from "../v2/Utility/VerticalIssueList";
interface ComicInfoProps {
  comicId: string;
}

export default function ComicInfo(props: ComicInfoProps) {
  const [apiResult, setApiResult] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const [issuesArray, setIssuesArray] = useState<Issue[] | null>(null);
  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const openLibraryModel = () => setLibraryModalOpen(true);
  const closeLibraryModel = () => setLibraryModalOpen(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const comicInfoCache = useSelector(comicInfoCacheSelector);
  const dispatch = useDispatch();

  // const refreshComic = async () => {
  //   setLoading(true);
  //   try {
  //     const comic = await ComicCompanionAPIService.getComic(props.comicId);
  //     setComicInfo(comic);
  //     dispatch(setComicInCache(comic));
  //   } catch (error) {
  //     const errorMessage = getErrorMessage(error);
  //     setError(errorMessage);
  //   }
  //   setLoading(false);
  // };

  const setComicInfo = (comic: Comic) => {
    setApiResult(comic);
    // const issuesArray: Issue[] = comic.issueIds?.map((issueId) => {
    //   return { comicId: comic.comicId, issueId: issueId };
    // }) as Issue[];
    // setIssuesArray(issuesArray);
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
        <>
          <AddToLibraryModal open={libraryModalOpen} setClose={closeLibraryModel} itemInfo={apiResult} readingListOrComic="comic" />
          <div className="flex flex-wrap m-auto gap-5 justify-center">
            <img referrerPolicy="no-referrer" src={apiResult.coverImg} alt={apiResult.name} ref={imgRef} className="w-80" />
            <div className="mx-4 max-w-xl">
              <h1 className="text-3xl border-b pb-2 font-bold">{apiResult.name}</h1>
              <div onClick={openLibraryModel} className="mt-2">
                <Button color="secondary" variant="contained">
                  <AddIcon /> Add to Library
                </Button>
                <div className="flex gap-4 opacity-50 mt-2">
                  {apiResult.status && <p>• {apiResult.status}</p>}
                  {apiResult.year && <p>• {apiResult.year}</p>}
                  {apiResult.author && <p>• {apiResult.author}</p>}
                </div>
              </div>
              <p className="mt-2">{apiResult.description}</p>
            </div>
          </div>

          <div className="mt-4 max-w-5xl mx-auto">
            <VerticalIssueList chapters={apiResult.chapters} />
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
