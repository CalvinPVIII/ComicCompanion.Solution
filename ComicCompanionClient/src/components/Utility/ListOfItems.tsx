import ItemCard from "./ItemCard";
import "../../styles/ListOfItems.css";
import { Comic } from "../../types";

interface ListOfItemsProps {
  items: Comic[];
}

export default function ListOfItems(props: ListOfItemsProps) {
  return (
    <div className="items-list">
      {props.items.map((element, index) => (
        <ItemCard key={index} item={element} />
      ))}
    </div>
  );
}
