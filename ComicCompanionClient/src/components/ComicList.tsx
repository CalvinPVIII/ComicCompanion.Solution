import { IComic } from "../types";
// import { Link } from "react-router-dom";
import "../styles/ComicList.css";
import ComicPopup from "./ComicPopup";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
interface ComicListProps {
  comics: IComic[];
}
export default function ComicList(props: ComicListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleComicClick = (comicId: string | undefined) => {
    setSelectedComicId(comicId);
    onOpen();
  };
  const [selectedComicId, setSelectedComicId] = useState<string | undefined>();

  return (
    <div className="comic-list">
      <ComicPopup comicId={selectedComicId} isOpen={isOpen} onClose={onClose} />
      {props.comics.map((comic) => (
        // <Link to={`/comics/${comic.comicId}`} key={comic.comicId}>
        <div onClick={() => handleComicClick(comic.comicId)}>
          <div className="comic-in-list">
            <img src={comic.coverImg} alt={`Cover for ${comic.name}`} />
            <p>{comic.name}</p>
          </div>
        </div>
        // </Link>
      ))}
    </div>
  );
}
