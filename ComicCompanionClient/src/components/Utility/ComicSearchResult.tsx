import { SearchResultDto } from "../../types";
import "../../styles/SearchResult.css";
import { Link } from "react-router-dom";

interface ComicSearchResultProps {
  searchResult: SearchResultDto;
}

export default function ComicSearchResult(props: ComicSearchResultProps) {
  console.log(props);
  return (
    <>
      {props.searchResult.comics.map((comic, index) => (
        <Link to={`/comics/${comic.comicId}`}>
          <div className="search-results" key={index}>
            <div className="inner-search-results">
              <img src={comic.coverImg} alt={comic.name} />
              <p>{comic.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
