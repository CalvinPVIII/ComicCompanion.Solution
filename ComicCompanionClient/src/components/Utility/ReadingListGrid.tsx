import { ReadingListDto } from "../../types";
import "../../styles/ReadingListGrid.css";
interface ReadingListGridProps {
  lists: ReadingListDto[];
}

export default function ReadingListGrid(props: ReadingListGridProps) {
  return (
    <div className="grid-list">
      {props.lists.map((list, index) => (
        <div key={index} className="grid-list-item" style={{ backgroundImage: `url(${list.coverImg})` }}>
          <div className="grid-list-text-wrapper">
            <p className="grid-list-text">{list.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
