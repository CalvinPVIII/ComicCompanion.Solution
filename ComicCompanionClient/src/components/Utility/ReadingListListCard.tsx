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
      <Link to={`/lists/${props.readingList.readingListId}`}>
        {props.readingList.coverImg ? (
          <img src={props.readingList.coverImg} alt={props.readingList.name} />
        ) : (
          <img src={comicCompanionImages[0]} alt={props.readingList.name} />
        )}
        <p>{props.readingList.name}</p>
      </Link>
    </div>
  );
}
