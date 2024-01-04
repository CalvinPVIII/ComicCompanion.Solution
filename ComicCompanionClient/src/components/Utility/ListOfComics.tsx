import ComicListCard from "./ComicListCard";
import "../../styles/ListOfItems.css";
import { Comic } from "../../types";
import ScrollContainer from "react-indiana-drag-scroll";
interface ListOfComicsProps {
  items: Comic[];
}

export default function ListOfComics(props: ListOfComicsProps) {
  return (
    <ScrollContainer>
      <div className="items-list">
        {props.items.map((element, index) => (
          <ComicListCard key={index} item={element} />
        ))}
      </div>
    </ScrollContainer>
  );
}
