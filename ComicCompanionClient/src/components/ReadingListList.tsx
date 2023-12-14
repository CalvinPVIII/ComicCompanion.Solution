import { ReadingList } from "../types";
import ReadingListCard from "./ReadingListCard";

interface ReadingListListProps {
  list: ReadingList[];
}

export default function ReadingListList(props: ReadingListListProps) {
  return (
    <>
      {props.list.map((readingList) => (
        <ReadingListCard key={readingList.readingListId} readingList={readingList} />
      ))}
    </>
  );
}
