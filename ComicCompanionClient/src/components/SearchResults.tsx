import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ComicList from "./ComicList";

import "../styles/SearchResults.css";

import { ISearchResultDto } from "../types";

interface SearchResultsProps {
  searchQuery?: string;
  finishedFetchCallback?: () => void;
}

export default function SearchResults(props: SearchResultsProps) {
  const { query } = useParams();

  const [apiLoaded, setApiLoaded] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<ISearchResultDto | null>();

  const search = async (): Promise<ISearchResultDto> => {
    const searchQuery = props.searchQuery ? props.searchQuery : query;
    return fetch(`${import.meta.env.VITE_API_URL}/comics/search?keyword=${searchQuery}`).then((r) => r.json().then((data) => data));
  };

  useEffect(() => {
    const getComics = async () => {
      if (query || props.searchQuery) {
        const comics = await search();
        console.log(comics);
        if (comics.comics.length === 0) {
          setSearchResult(null);
        } else {
          setSearchResult(comics);
        }
        setApiLoaded(true);
        if (props.finishedFetchCallback) props.finishedFetchCallback();
      }
    };
    getComics();
  }, [query, props.searchQuery]);

  return (
    <>
      <h1 className="search-results-header">Results for: {query}</h1>
      {searchResult && apiLoaded ? (
        <>
          <div className="search-results-content">
            <ComicList comics={searchResult.comics} />
          </div>
        </>
      ) : !searchResult && apiLoaded ? (
        <p>No results were found</p>
      ) : (
        <></>
      )}
    </>
  );
}
