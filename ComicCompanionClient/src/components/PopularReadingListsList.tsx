import { useState, useEffect } from "react";
import { ReadingListSearchResultAPIResponse } from "../types";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import ListOfReadingLists from "./Utility/ListOfReadingLists";
export default function PopularReadingListsList() {
  const [apiResponse, setApiResponse] = useState<ReadingListSearchResultAPIResponse | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const readingLists = await ComicCompanionAPIService.getPopularReadingLists();
        setApiResponse(readingLists);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="popular-comics-list">
      {!loading && apiResponse ? (
        <>
          <ListOfReadingLists items={apiResponse.data} />
        </>
      ) : !loading && error ? (
        <>
          <p>There was an error</p>
        </>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
