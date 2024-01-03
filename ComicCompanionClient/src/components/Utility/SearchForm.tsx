import { TextField } from "@mui/material";
import "../../styles/SearchForm.css";
import { useEffect, useState } from "react";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import SearchResult from "./SearchResult";
import { SearchResultAPIResponse } from "../../types";

interface SearchFormProps {
  typeOfSearch: "Comics" | "Reading Lists";
}

export default function SearchForm(props: SearchFormProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchingStatus, setSearchingStatus] = useState<"notSearching" | "searching" | "searchComplete">("notSearching");
  const [searchResults, setSearchResults] = useState<SearchResultAPIResponse | null>();

  useEffect(() => {
    // when the component is rendered, handleSearch will be called after 1 second
    const timer = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // event handler for the input
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchingStatus("searching");
    setSearchInput(e.target.value);
  };

  // this is the function that will be called to actually search whatever the result is
  const handleSearch = async () => {
    if (searchInput) {
      const searchResult = await ComicCompanionAPIService.searchComics(searchInput);
      setSearchResults(searchResult);
      setSearchingStatus("searchComplete");
    } else {
      setSearchingStatus("notSearching");
    }
  };

  return (
    <>
      <div className="search-form-header">
        <TextField id="outlined-basic" label={`Search ${props.typeOfSearch}`} variant="outlined" fullWidth onChange={handleUserInput} />
      </div>
      {searchingStatus === "searchComplete" && searchResults ? (
        <>
          <SearchResult searchResult={searchResults} />
        </>
      ) : searchingStatus === "searching" ? (
        <>searching</>
      ) : (
        <></>
      )}
    </>
  );
}
