import SearchBar from "./SearchBar";
import { useState } from "react";
import SearchResults from "./SearchResults";
import { Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { currentEditingReadingListSelector } from "../redux/readingListReducer";
import ReadingListForm from "./ReadingListForm";
export default function CreateReadingListPage() {
  const currentEditingReadingList = useSelector(currentEditingReadingListSelector);
  const [searching, setSearching] = useState<boolean | null>();
  const [query, setQuery] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setSearching(false);
  };

  const onInputChange = () => {
    setSearching(true);
  };
  console.log(currentEditingReadingList);

  return (
    <>
      {!currentEditingReadingList || formVisible ? (
        <>
          <ReadingListForm currentEditingReadingList={currentEditingReadingList} setFormVisibility={setFormVisible} />
        </>
      ) : (
        <></>
      )}
      {currentEditingReadingList ? (
        <>
          <div className="readinglist-info">
            <p onClick={() => setFormVisible(true)}>Currently editing: {currentEditingReadingList.name}</p>
            {currentEditingReadingList.issues.length > 0 ? (
              <>
                <p>Currently added issues:</p>
                {currentEditingReadingList.issues.map((issue) => (
                  <p>
                    {issue.comicId} {issue.issueId}
                  </p>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          {}
          <SearchBar searchCallback={handleSearch} searchOnInputChange={true} searchOnInputChangeCallback={onInputChange} />
          {searching ? (
            <>
              <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </>
          ) : (
            <>
              <SearchResults searchQuery={query} />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
