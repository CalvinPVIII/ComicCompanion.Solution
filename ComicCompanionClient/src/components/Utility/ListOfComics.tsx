import ComicListCard from "./ComicListCard";
import "../../styles/ListOfItems.css";
import { Comic } from "../../types";

interface ListOfComicsProps {
  items: Comic[];
}

export default function ListOfComics(props: ListOfComicsProps) {
  return (
    <div className="items-list">
      {props.items.map((element, index) => (
        <ComicListCard key={index} item={element} />
      ))}
    </div>
  );
}
