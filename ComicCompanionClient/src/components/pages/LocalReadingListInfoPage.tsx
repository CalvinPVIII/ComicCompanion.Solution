import { useSelector } from "react-redux";
import { librarySelector } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReadingListInfo from "../Utility/ReadingListInfo";
import { ReadingListDto } from "../../types";
import Loading from "../Utility/Loading";
export default function LocalReadingListInfoPage() {
  const [readingList, setReadingList] = useState<ReadingListDto | "loading" | undefined>("loading");
  const { listId } = useParams();
  const library = useSelector(librarySelector);

  useEffect(() => {
    try {
      const foundList = library.readingListCategories["created"].readingLists.find((list) => list.readingListId === listId);
      setReadingList(foundList);
    } catch (e) {
      setReadingList(undefined);
    }
  });

  if (readingList && readingList !== "loading") {
    return <ReadingListInfo readingList={readingList} />;
  } else if (readingList === "loading") {
    return <Loading />;
  } else {
    return <h3>This reading list does not exist</h3>;
  }
}
