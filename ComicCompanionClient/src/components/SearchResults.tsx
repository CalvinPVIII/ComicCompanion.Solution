import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ComicList from "./ComicList";

import "../styles/SearchResults.css";

import { ISearchResultDto } from "../types";

export default function SearchResults() {
  const { query } = useParams();

  const [apiLoading, setApiLoading] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<ISearchResultDto | null>();

  const search = async (): Promise<ISearchResultDto> => {
    return fetch(`${import.meta.env.VITE_API_URL}/comics/search?keyword=${query}`).then((r) => r.json().then((data) => data));
  };

  useEffect(() => {
    const getComics = async () => {
      const comics = await search();
      console.log(comics);
      setApiLoading(false);
      setSearchResult(comics);
    };
    getComics();
  }, [query]);

  return (
    <>
      <h1 className="search-results-header">Results for: {query}</h1>
      {!apiLoading && searchResult ? (
        <>
          <ComicList comics={searchResult.comics} />
        </>
      ) : (
        <>
          <p>Searching...</p>
        </>
      )}
    </>
  );
}
