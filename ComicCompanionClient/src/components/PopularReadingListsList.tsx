import { useState, useEffect } from "react";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import ListOfReadingLists from "./Utility/ListOfReadingLists";
import "../styles/PopularList.css";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../helpers/helperFunctions";
import Loading from "./Utility/Loading";
import { setPopularReadingLists } from "../redux/apiCacheSlice";
import { useDispatch, useSelector } from "react-redux";
import { popularReadingListsCacheSelector } from "../redux/store";
export default function PopularReadingListsList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const popularReadingLists = useSelector(popularReadingListsCacheSelector);

  useEffect(() => {
    const getData = async () => {
      try {
        if (popularReadingLists && popularReadingLists.length > 0) return;
        const readingLists = await ComicCompanionAPIService.getPopularReadingLists();
        dispatch(setPopularReadingLists(readingLists.data));
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
    };
    getData();
    setLoading(false);
  }, []);

  return (
    <div className="popular-list">
      {!loading && popularReadingLists ? (
        <>
          <ListOfReadingLists items={popularReadingLists} />
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
