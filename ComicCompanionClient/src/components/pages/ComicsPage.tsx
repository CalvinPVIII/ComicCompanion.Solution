import { useSelector } from "react-redux";
import SearchForm from "../Utility/SearchForm";
import { popularComicsCacheSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { useDispatch } from "react-redux";
import { setPopularComics } from "../../redux/apiCacheSlice";
import { Comic } from "../../types";

export default function ComicPage() {
  const dispatch = useDispatch();
  const popularComicsCache = useSelector(popularComicsCacheSelector);
  const [placeHolderComics, setPlaceHolderComics] = useState(popularComicsCache?.comics);

  const fetchPlaceHolderComics = async (pageNumber: number) => {
    const result = await ComicCompanionAPIService.getPopularComics(pageNumber);
    console.log(result);
    let newPlaceHolderComics: Comic[] = [];
    if (placeHolderComics) {
      newPlaceHolderComics = [...placeHolderComics];
    }
    newPlaceHolderComics = newPlaceHolderComics.concat(result.data.comics);

    setPlaceHolderComics(newPlaceHolderComics);
    dispatch(
      setPopularComics({ comics: newPlaceHolderComics, paginationInfo: { maxPage: result.data.maxPage, currentPage: result.data.currentPage } })
    );
  };

  useEffect(() => {
    if (!popularComicsCache || popularComicsCache.comics.length <= 0) {
      fetchPlaceHolderComics(1);
    }
  }, [popularComicsCache]);

  const bottomScrollCallback = () => {
    if (!popularComicsCache) return;
    if (popularComicsCache.paginationInfo.currentPage < popularComicsCache.paginationInfo.maxPage) {
      fetchPlaceHolderComics(popularComicsCache.paginationInfo.currentPage + 1);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Comics</h1>
      <SearchForm typeOfSearch="Comics" placeholderComicSearch={placeHolderComics} bottomScrollCallback={bottomScrollCallback} />
    </>
  );
}
