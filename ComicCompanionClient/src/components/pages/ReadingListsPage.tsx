import SearchForm from "../Utility/SearchForm";
import { useSelector } from "react-redux";
import { popularReadingListsCacheSelector } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { ReadingListDto } from "../../types";
import { setPopularReadingLists } from "../../redux/apiCacheSlice";

export default function ReadingListsPage() {
  const dispatch = useDispatch();
  const popularReadingListsCache = useSelector(popularReadingListsCacheSelector);
  // const [placeHolderReadingLists, setPlaceHolderReadingLists] = useState(popularReadingListsCache);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchPlaceHolderLists = async () => {
    const result = await ComicCompanionAPIService.getPopularReadingLists();
    let newPlaceHolderReadingLists: ReadingListDto[] = [];
    if (popularReadingListsCache) {
      newPlaceHolderReadingLists = [...popularReadingListsCache];
    }
    newPlaceHolderReadingLists = newPlaceHolderReadingLists.concat(result.data);
    dispatch(setPopularReadingLists(newPlaceHolderReadingLists));
  };

  useEffect(() => {
    if (!popularReadingListsCache || popularReadingListsCache.length <= 0) {
      fetchPlaceHolderLists();
    }
  });

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Reading Lists</h1>

      <SearchForm typeOfSearch="Reading Lists" placeholderReadingListSearch={popularReadingListsCache} />
    </>
  );
}
