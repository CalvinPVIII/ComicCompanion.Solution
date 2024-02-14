import { ReadingListDto } from "../../types";
import { Link } from "react-router-dom";
import "../../styles/ItemGrid.css";

interface ReadingListGridProps {
  lists: ReadingListDto[];
}

export default function ReadingListGrid(props: ReadingListGridProps) {
  return (
    <div className="grid-list">
      {props.lists.map((list, index) => (
        <Link to={list.shared ? `/lists/shared/${list.readingListId}` : `/lists/local/${list.readingListId}`} key={index} className="item-link">
          <img src={list.coverImg} className="grid-list-img" />
          <div className="grid-list-text-wrapper">
            <span className="text-wrapper">
              <p className="grid-list-text">{list.name}</p>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
