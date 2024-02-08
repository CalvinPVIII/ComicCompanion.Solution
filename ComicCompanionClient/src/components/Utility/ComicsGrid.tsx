import { Comic } from "../../types";
import { Link } from "react-router-dom";
import "../../styles/ReadingListGrid.css";

interface ComicsGridProps {
  comics: Comic[];
}

export default function ComicsGrid(props: ComicsGridProps) {
  return (
    <div className="grid-list">
      {props.comics.map((comic, index) => (
        <Link to={`/comics/${comic.comicId}`} key={index} className="item-link">
          <img src={comic.coverImg} className="grid-list-img" />
          <div className="grid-list-text-wrapper">
            <span className="text-wrapper">
              <p className="grid-list-text">{comic.name}</p>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
