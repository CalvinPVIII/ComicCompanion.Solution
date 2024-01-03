import "../../styles/ItemCard.css";
import { Comic } from "../../types";
import { Link } from "react-router-dom";

interface ItemCardProps {
  item: Comic; // will need to account for other data types at some point
}

export default function ItemCard(props: ItemCardProps) {
  return (
    <div className="item-card">
      <Link to={`/comics/${props.item.comicId}`}>
        <img src={props.item.coverImg} alt={props.item.name} />
        <p>{props.item.name}</p>
      </Link>
    </div>
  );
}
