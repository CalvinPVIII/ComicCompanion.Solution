import SearchForm from "../Utility/SearchForm";
import { useSelector } from "react-redux";
import { popularReadingListsCacheSelector } from "../../redux/store";
import { useState } from "react";
import ReadingListGrid from "../Utility/ReadingListGrid";
export default function ReadingListsPage() {
  const [showCachedResults, setShowCachedResults] = useState(true);

  const popularReadingListsCache = useSelector(popularReadingListsCacheSelector);

  const onInputCallback = () => {
    setShowCachedResults(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Reading Lists</h1>

      <SearchForm typeOfSearch="Reading Lists" onInputCallbackFunction={onInputCallback} />
      {showCachedResults && popularReadingListsCache ? (
        <>
          <ReadingListGrid lists={popularReadingListsCache} />
        </>
      ) : null}
    </>
  );
}
