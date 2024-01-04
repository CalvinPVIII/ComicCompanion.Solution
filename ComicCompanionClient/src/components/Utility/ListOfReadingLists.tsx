import { ReadingListDto } from "../../types";
import ReadingListListCard from "./ReadingListListCard";
import "../../styles/ListOfItems.css";
import ScrollContainer from "react-indiana-drag-scroll";

interface ListOfReadingListsProps {
  items: ReadingListDto[];
}

export default function ListOfReadingLists(props: ListOfReadingListsProps) {
  return (
    <ScrollContainer>
      <div className="items-list">
        {props.items.map((readingList, index) => (
          <ReadingListListCard key={index} readingList={readingList} />
        ))}
      </div>
    </ScrollContainer>
  );
}
