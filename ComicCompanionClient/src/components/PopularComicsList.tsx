import { useState, useEffect } from "react";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import ListOfComics from "./Utility/ListOfComics";
import "../styles/PopularList.css";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../helpers/helperFunctions";
import Loading from "./Utility/Loading";
import { useDispatch } from "react-redux";
import { setPopularComics } from "../redux/apiCacheSlice";
import { useSelector } from "react-redux";
import { popularComicsCacheSelector } from "../redux/store";

export default function PopularComicsList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const popularComicsCache = useSelector(popularComicsCacheSelector);

  useEffect(() => {
    const getData = async () => {
      try {
        if (popularComicsCache && popularComicsCache.comics.length > 0) return;
        const response = await ComicCompanionAPIService.getPopularComics();
        if (response.data.comics.length === 0) {
          throw new Error("Unable to get comics");
        }
        const newCacheInfo = {
          comics: response.data.comics,
          paginationInfo: { maxPage: response.data.maxPage, currentPage: response.data.currentPage },
        };
        dispatch(setPopularComics(newCacheInfo));
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
    };
    getData();
    setLoading(false);
  }, []);

  console.log(popularComicsCache);

  return (
    <div className="popular-list">
      {!loading && popularComicsCache ? (
        <>
          <ListOfComics items={popularComicsCache.comics.slice(0, 10)} />
        </>
      ) : !loading && error ? (
        <>
          <Alert severity="error">{error}</Alert>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
