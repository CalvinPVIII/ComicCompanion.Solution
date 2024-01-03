import "../../styles/ItemListCard.css";
import { Comic } from "../../types";
import { Link } from "react-router-dom";

interface ComicListCardProps {
  item: Comic;
}

export default function ComicListCard(props: ComicListCardProps) {
  return (
    <div className="item-card">
      <Link to={`/comics/${props.item.comicId}`}>
        <img src={props.item.coverImg} alt={props.item.name} />
        <p>{props.item.name}</p>
      </Link>
    </div>
  );
}
