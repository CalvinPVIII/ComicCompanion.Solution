import { ReadingListSearchResultAPIResponse } from "../../types";
import "../../styles/SearchResult.css";
import comicCompanionImages from "../../helpers/defaultImageArray";

interface ReadingListSearchResultProps {
  searchResult: ReadingListSearchResultAPIResponse;
}

export default function ReadingListSearchResult(props: ReadingListSearchResultProps) {
  console.log(props);
  return (
    <>
      {props.searchResult.data.map((readingList, index) => (
        <div className="search-results" key={index}>
          <div className="inner-search-results">
            {readingList.coverImg ? (
              <img src={readingList.coverImg} alt={readingList.name} />
            ) : (
              <img src={comicCompanionImages[0]} alt={readingList.name} />
            )}
            <div className="reading-list-search-result-info">
              <p>{readingList.name}</p>
              <p>{readingList.createdBy}</p>
              <p>{readingList.description}</p>
              <p>{readingList.issues?.length} issues</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
