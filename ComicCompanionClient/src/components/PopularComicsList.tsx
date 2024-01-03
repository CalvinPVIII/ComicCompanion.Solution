import { useState, useEffect } from "react";
import { PopularComicsApiResponse } from "../types";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import ListOfItems from "./Utility/ListOfItems";

export default function PopularComicsList() {
  const [apiResponse, setApiResponse] = useState<PopularComicsApiResponse | null>();
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

  if (loading) {
    return <p>loading</p>;
  } else {
    if (error) {
      return <p>there was an error</p>;
    } else if (apiResponse) {
      return <ListOfItems items={apiResponse.data.comics} />;
    }
  }
}
