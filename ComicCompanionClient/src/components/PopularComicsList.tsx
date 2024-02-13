import { useState, useEffect } from "react";
import { ComicSearchResultAPIResponse } from "../types";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import ListOfComics from "./Utility/ListOfComics";
import "../styles/PopularList.css";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../helpers/helperFunctions";
import Loading from "./Utility/Loading";
import { useDispatch } from "react-redux";
import { setPopularComics } from "../redux/apiCacheSlice";

export default function PopularComicsList() {
  const [apiResponse, setApiResponse] = useState<ComicSearchResultAPIResponse | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const comics = await ComicCompanionAPIService.getPopularComics();
        console.log(comics);
        if (comics.data.comics.length === 0) {
          throw new Error("Unable to get comics");
        }
        dispatch(setPopularComics(comics.data.comics));
        setApiResponse(comics);
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="popular-list">
      {!loading && apiResponse ? (
        <>
          <ListOfComics items={apiResponse.data.comics} />
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
