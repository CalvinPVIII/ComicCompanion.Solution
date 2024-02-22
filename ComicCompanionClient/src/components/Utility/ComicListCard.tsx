import "../../styles/ItemListCard.css";
import { Comic } from "../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface ComicListCardProps {
  item: Comic;
}

export default function ComicListCard(props: ComicListCardProps) {
  const [mouseMoved, setMouseMoved] = useState(false);

  const nav = useNavigate();

  const handleClick = () => {
    if (!mouseMoved) {
      nav(`/comics/${props.item.comicId}`);
    }
  };

  const handleMouseDown = () => {
    setMouseMoved(false);
  };
  const handleMouseMove = () => {
    setMouseMoved(true);
  };

  return (
    <div className="item-card">
      <div onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleClick}>
        <img src={props.item.coverImg} alt={props.item.name} />
        <p>{props.item.name}</p>
      </div>
    </div>
  );
}
