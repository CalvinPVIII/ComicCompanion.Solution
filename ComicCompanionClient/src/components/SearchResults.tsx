import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { IComic } from "../types";

import { Link } from "react-router-dom";

export default function SearchResults() {
  const { query } = useParams();

  const [apiLoading, setApiLoading] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<IComic[] | null>();

  const search = async (): Promise<IComic[]> => {
    return fetch(`${import.meta.env.VITE_API_URL}/comics/search?keyword=${query}`).then((r) => r.json().then((data) => data));
  };

  useEffect(() => {
    const getComics = async () => {
      const comics = await search();
      setApiLoading(false);
      setSearchResult(comics);
    };
    getComics();
  }, [query]);

  return (
    <>
      <h1>Search</h1>
      <h2>{query}</h2>
      {!apiLoading && searchResult ? (
        <>
          <h2>Results</h2>
          {searchResult.map((comic) => (
            <>
              <p>{comic.name}</p>
              <Link to={`/comics/${comic.comicId}`}>
                <img src={comic.coverImg} alt={`Cover for ${comic.name}`} />
              </Link>
            </>
          ))}
        </>
      ) : (
        <>
          <p>Searching...</p>
        </>
      )}
    </>
  );
}
