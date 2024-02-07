import { Comic } from "../../types";
import { Link } from "react-router-dom";
import "../../styles/ReadingListGrid.css";

interface LibraryGridProps {
  comics: Comic[];
}

export default function LibraryGrid(props: LibraryGridProps) {
  return (
    <div className="grid-list">
      {props.comics.map((comic, index) => (
        <Link to={`/comics/${comic.comicId}`} key={index}>
          <div className="grid-list-item" style={{ backgroundImage: `url(${comic.coverImg})` }}>
            <div className="grid-list-text-wrapper">
              <span className="text-wrapper">
                <p className="grid-list-text">{comic.name}</p>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
