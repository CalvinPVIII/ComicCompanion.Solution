import { ReadingListDto } from "../../types";
import { Link } from "react-router-dom";
import "../../styles/ReadingListGrid.css";
interface ReadingListGridProps {
  lists: ReadingListDto[];
}

export default function ReadingListGrid(props: ReadingListGridProps) {
  return (
    <div className="grid-list">
      {props.lists.map((list, index) => (
        <Link to={`/lists/${list.readingListId}`} key={index}>
          <div className="grid-list-item" style={{ backgroundImage: `url(${list.coverImg})` }}>
            <div className="grid-list-text-wrapper">
              <p className="grid-list-text">{list.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
