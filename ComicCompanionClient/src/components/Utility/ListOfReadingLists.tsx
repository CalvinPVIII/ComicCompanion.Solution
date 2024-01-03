import { ReadingListDto } from "../../types";
import ReadingListListCard from "./ReadingListListCard";

interface ListOfReadingListsProps {
  items: ReadingListDto[];
}

export default function ListOfReadingLists(props: ListOfReadingListsProps) {
  return (
    <div className="items-list">
      {props.items.map((readingList, index) => (
        <ReadingListListCard key={index} readingList={readingList} />
      ))}
    </div>
  );
}
