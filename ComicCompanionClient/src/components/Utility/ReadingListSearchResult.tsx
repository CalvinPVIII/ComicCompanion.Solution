import { ReadingListDto } from "../../types";
import comicCompanionImages from "../../helpers/defaultImageArray";
import { Link } from "react-router-dom";
import "../../styles/ReadingListSearchResult.css";
// import "../../styles/SearchResult.css";

interface ReadingListSearchResultProps {
  readingLists: ReadingListDto[];
  openInModal?: boolean;
}

export default function ReadingListSearchResult(props: ReadingListSearchResultProps) {
  return (
    <div id="reading-list-search-results">
      {props.readingLists.map((readingList, index) => (
        <Link to={`/lists/${readingList.readingListId}`} key={index}>
          <div className="search-results" key={index}>
            <div className="inner-search-results">
              {readingList.coverImg ? (
                <img src={readingList.coverImg} alt={readingList.name} />
              ) : (
                <img src={comicCompanionImages[0]} alt={readingList.name} />
              )}
              <div className="reading-list-search-result-info">
                <p className="reading-list-name">{readingList.name}</p>
                <p className="reading-list-author">created by {readingList.createdBy}</p>
                <p className="reading-list-description">{readingList.description}</p>
                <p className="reading-list-issues">{readingList.issues?.length} issues</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
