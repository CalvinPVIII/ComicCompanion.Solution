import { Alert, TextField } from "@mui/material";
import "../../styles/SearchForm.css";
import { useEffect, useState } from "react";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import ComicSearchResult from "./ComicSearchResult";
import ReadingListSearchResult from "./ReadingListSearchResult";
import { ReadingListSearchResultAPIResponse, SearchResultDto } from "../../types";
import { getErrorMessage } from "../../helpers/helperFunctions";
import Loading from "./Loading";

interface SearchFormProps {
  typeOfSearch: "Comics" | "Reading Lists";
}

export default function SearchForm(props: SearchFormProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchingStatus, setSearchingStatus] = useState<"notSearching" | "searching" | "searchComplete">("notSearching");
  const [comicSearchResult, setComicSearchResults] = useState<SearchResultDto | null>(null);
  const [readingListSearchResult, setReadingListSearchResult] = useState<ReadingListSearchResultAPIResponse | null>(null);
  const [error, setError] = useState<false | string>(false);

  useEffect(() => {
    // when the component is rendered, handleSearch will be called after 1 second
    const timer = setTimeout(() => {
      if (props.typeOfSearch === "Comics") {
        handleSearchComics();
      } else if (props.typeOfSearch === "Reading Lists") {
        handleSearchReadingLists();
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
    try {
      if (searchInput) {
        const apiResponse = await ComicCompanionAPIService.searchComics(searchInput);
        console.log(apiResponse);
        setComicSearchResults(apiResponse);
        setSearchingStatus("searchComplete");
      } else {
        setSearchingStatus("notSearching");
      }
      setError(false);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    }
  };

  // this handles searching for reading lists and structuring them for the SearchResult component
  const handleSearchReadingLists = async () => {
    try {
      if (searchInput) {
        const response = await ComicCompanionAPIService.searchReadingLists(searchInput);
        setReadingListSearchResult(response);
        setSearchingStatus("searchComplete");
      } else {
        setSearchingStatus("notSearching");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    }
  };

  return (
    <>
      <div className="search-form-header">
        <TextField id="outlined-basic" label={`Search ${props.typeOfSearch}`} variant="outlined" fullWidth onChange={handleUserInput} />
      </div>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : searchingStatus === "searchComplete" ? (
        <>
          {props.typeOfSearch === "Comics" && comicSearchResult ? (
            <>
              <ComicSearchResult searchResult={comicSearchResult} />
            </>
          ) : props.typeOfSearch === "Reading Lists" && readingListSearchResult ? (
            <>
              <ReadingListSearchResult searchResult={readingListSearchResult} />
            </>
          ) : (
            <></>
          )}
        </>
      ) : searchingStatus === "searching" ? (
        <>
          <Loading />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
