import { Comic } from "../../types";
import { Link } from "react-router-dom";
import "../../styles/ReadingListGrid.css";
import { useDispatch } from "react-redux";
import { toggleModal, setContent } from "../../redux/modalSlice";
import React from "react";
interface ComicsGridProps {
  comics: Comic[];
  openInModal?: boolean;
}

export default function ComicsGrid(props: ComicsGridProps) {
  const dispatch = useDispatch();

  const handleOpenModal = (comicId: string) => {
    dispatch(setContent({ type: "Comic Info", data: { comicId: comicId } }));
    dispatch(toggleModal(true));
  };
  return (
    <div className="grid-list">
      {props.comics.map((comic, index) => (
        <React.Fragment key={index}>
          {props.openInModal ? (
            <>
              <div className="item-link" onClick={() => handleOpenModal(comic.comicId)}>
                <img src={comic.coverImg} className="grid-list-img" />
                <div className="grid-list-text-wrapper">
                  <span className="text-wrapper">
                    <p className="grid-list-text">{comic.name}</p>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <Link to={`/comics/${comic.comicId}`} className="item-link">
              <img src={comic.coverImg} className="grid-list-img" />
              <div className="grid-list-text-wrapper">
                <span className="text-wrapper">
                  <p className="grid-list-text">{comic.name}</p>
                </span>
              </div>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
