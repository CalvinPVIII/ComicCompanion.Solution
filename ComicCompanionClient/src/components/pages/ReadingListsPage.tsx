import SearchForm from "../Utility/SearchForm";
import { useSelector } from "react-redux";
import { popularReadingListsCacheSelector } from "../../redux/store";
import { useEffect } from "react";

export default function ReadingListsPage() {
  const popularReadingListsCache = useSelector(popularReadingListsCacheSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Reading Lists</h1>

      <SearchForm typeOfSearch="Reading Lists" placeholderReadingListSearch={popularReadingListsCache} />
    </>
  );
}
