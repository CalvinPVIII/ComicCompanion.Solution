import "../../styles/ItemCard.css";
import { Comic } from "../../types";

interface ItemCardProps {
  item: Comic; // will need to account for other data types at some point
}

export default function ItemCard(props: ItemCardProps) {
  return (
    <div className="item-card">
      <img src={props.item.coverImg} alt={props.item.name} />
      <p>{props.item.name}</p>
    </div>
  );
}
