import { useDisclosure } from "@chakra-ui/react";
import { ReadingList } from "../types";
import ReadingListPopup from "./ReadingListPopup";

interface ReadingListCardProps {
  readingList: ReadingList;
}

export default function ReadingListCard({ readingList }: ReadingListCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReadingListClick = () => {
    onOpen();
  };
  return (
    <>
      <ReadingListPopup isOpen={isOpen} onClose={onClose} readingList={readingList} />
      <div onClick={handleReadingListClick}>
        <h2>{readingList.name}</h2>
        <h2>{readingList.description}</h2>
        <h2>{readingList.rating}</h2>
      </div>
    </>
  );
}
