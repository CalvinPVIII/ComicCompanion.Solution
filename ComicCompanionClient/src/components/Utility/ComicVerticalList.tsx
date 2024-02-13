import { Comic } from "../../types";
import "../../styles/SearchResult.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleModal, setContent } from "../../redux/modalSlice";
import React, { useEffect } from "react";

interface ComicSearchResultProps {
  comics: Comic[];
  openInModal?: boolean;
}

export default function ComicSearchResult(props: ComicSearchResultProps) {
  const dispatch = useDispatch();
  const handleOpenModal = (comicId: string) => {
    dispatch(setContent({ type: "Comic Info", data: { comicId: comicId } }));
    dispatch(toggleModal(true));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {props.comics.map((comic, index) => (
        <React.Fragment key={index}>
          {props.openInModal ? (
            <>
              <div className="search-results" key={index} onClick={() => handleOpenModal(comic.comicId)}>
                <div className="inner-search-results">
                  <img src={comic.coverImg} alt={comic.name} />
                  <p>{comic.name}</p>
                </div>
              </div>
            </>
          ) : (
            <Link to={`/comics/${comic.comicId}`}>
              <div className="search-results" key={index}>
                <div className="inner-search-results">
                  <img src={comic.coverImg} alt={comic.name} />
                  <p>{comic.name}</p>
                </div>
              </div>
            </Link>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
