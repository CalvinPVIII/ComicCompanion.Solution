import { TextField } from "@mui/material";
import "../../styles/SearchForm.css";
import { useEffect, useState } from "react";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import ComicSearchResult from "./ComicSearchResult";
import ReadingListSearchResult from "./ReadingListSearchResult";
import { ComicSearchResultAPIResponse, ReadingListSearchResultAPIResponse, SearchResultDto } from "../../types";

interface SearchFormProps {
  typeOfSearch: "Comics" | "Reading Lists";
}

export default function SearchForm(props: SearchFormProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchingStatus, setSearchingStatus] = useState<"notSearching" | "searching" | "searchComplete">("notSearching");
  const [comicSearchResult, setComicSearchResults] = useState<SearchResultDto | null>(null);
  const [readingListSearchResult, setReadingListSearchResult] = useState<ReadingListSearchResultAPIResponse | null>(null);

  useEffect(() => {
    // when the component is rendered, handleSearch will be called after 1 second
    const timer = setTimeout(() => {
      if (props.typeOfSearch === "Comics") {
        handleSearchComics();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, props.typeOfSearch]);

  // event handler for the input
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchingStatus("searching");
    setSearchInput(e.target.value);
  };

  // one of these is the function that will be called to actually search whatever the result is

  // this handles searching for comics and structuring them for the SearchResult component
  const handleSearchComics = async () => {
    if (searchInput) {
      const apiResponse = await ComicCompanionAPIService.searchComics(searchInput);
      console.log(apiResponse);
      setComicSearchResults(apiResponse);
      setSearchingStatus("searchComplete");
    } else {
      setSearchingStatus("notSearching");
    }
  };

  // this handles searching for reading lists and structuring them for the SearchResult component
  // const handleSearchReadingLists = async () => {

  // }

  return (
    <>
      <div className="search-form-header">
        <TextField id="outlined-basic" label={`Search ${props.typeOfSearch}`} variant="outlined" fullWidth onChange={handleUserInput} />
      </div>
      {searchingStatus === "searchComplete" ? (
        <>
          {props.typeOfSearch === "Comics" && comicSearchResult ? (
            <>
              <ComicSearchResult searchResult={comicSearchResult} />
            </>
          ) : props.typeOfSearch === "Reading Lists" && readingListSearchResult ? (
            <>
              <ReadingListSearchResult searchResult={readingListSearchResult} />{" "}
            </>
          ) : (
            <></>
          )}
        </>
      ) : searchingStatus === "searching" ? (
        <>searching</>
      ) : (
        <></>
      )}
    </>
  );
}
