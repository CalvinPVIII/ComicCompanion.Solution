import { useState, useEffect } from "react";
import { ReadingListSearchResultAPIResponse } from "../types";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import ListOfReadingLists from "./Utility/ListOfReadingLists";
import "../styles/PopularList.css";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../helpers/helperFunctions";
import Loading from "./Utility/Loading";
export default function PopularReadingListsList() {
  const [apiResponse, setApiResponse] = useState<ReadingListSearchResultAPIResponse | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const readingLists = await ComicCompanionAPIService.getPopularReadingLists();
        setApiResponse(readingLists);
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
          <ListOfReadingLists items={apiResponse.data} />
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
