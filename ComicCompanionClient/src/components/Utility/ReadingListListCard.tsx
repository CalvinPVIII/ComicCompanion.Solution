import { ReadingListDto } from "../../types";
interface ReadingListListCardProps {
  readingList: ReadingListDto;
}

export default function ReadingListListCard(props: ReadingListListCardProps) {
  return <h1>{props.readingList.name}</h1>;
}
