import { useState, useEffect } from "react";
import { ComicSearchResultAPIResponse } from "../types";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import ListOfComics from "./Utility/ListOfComics";
import "../styles/PopularList.css";

export default function PopularComicsList() {
  const [apiResponse, setApiResponse] = useState<ComicSearchResultAPIResponse | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const comics = await ComicCompanionAPIService.getPopularComics();
        setApiResponse(comics);
      } catch (error) {
        setError(error);
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
          <p>There was an error</p>
        </>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
