import { IComic } from "../types";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/ComicList.css";
interface ComicListProps {
  comics: IComic[];
}
export default function ComicList(props: ComicListProps) {
  return (
    <div className="comic-list">
      {props.comics.map((comic) => (
        <Link to={`/comics/${comic.comicId}`}>
          <div className="comic-in-list" key={comic.comicId}>
            <img src={comic.coverImg} alt={`Cover for ${comic.name}`} />
            <p>{comic.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
