import { ReadingListDto } from "../../types";
import "../../styles/ItemListCard.css";
import { Link } from "react-router-dom";
import comicCompanionImages from "../../helpers/defaultImageArray";

interface ReadingListListCardProps {
  readingList: ReadingListDto;
}

export default function ReadingListListCard(props: ReadingListListCardProps) {
  return (
    <div className="item-card">
      <Link to={`/lists/shared/${props.readingList.readingListId}`}>
        {props.readingList.coverImg && props.readingList.coverImg !== "null" ? (
          <img src={props.readingList.coverImg} alt={props.readingList.name} referrerPolicy="no-referrer" />
        ) : (
          <img src={comicCompanionImages[0]} alt={props.readingList.name} referrerPolicy="no-referrer" />
        )}
        <p>{props.readingList.name}</p>
      </Link>
    </div>
  );
}
