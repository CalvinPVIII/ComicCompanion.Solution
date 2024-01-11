import { Alert, TextField } from "@mui/material";
import "../../styles/SearchForm.css";
import { useEffect, useState } from "react";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import ComicSearchResult from "./ComicSearchResult";
import ReadingListSearchResult from "./ReadingListSearchResult";
import { ReadingListSearchResultAPIResponse, SearchResultDto } from "../../types";
import { getErrorMessage } from "../../helpers/helperFunctions";
import Loading from "./Loading";

import { useBottomScrollListener } from "react-bottom-scroll-listener";

interface SearchFormProps {
  typeOfSearch: "Comics" | "Reading Lists";
}

type PaginationInfo = {
  currentPage: number;
  maxPage: number;
};

export default function SearchForm(props: SearchFormProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchingStatus, setSearchingStatus] = useState<"notSearching" | "searching" | "searchComplete">("notSearching");
  const [comicSearchResult, setComicSearchResults] = useState<SearchResultDto | null>(null);
  const [readingListSearchResult, setReadingListSearchResult] = useState<ReadingListSearchResultAPIResponse | null>(null);
  const [error, setError] = useState<false | string>(false);

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({ currentPage: 0, maxPage: 0 });

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

  const comicBottomScrollHandler = async () => {
    if (!comicSearchResult) return;
    const apiResponse = await ComicCompanionAPIService.searchComics(searchInput, undefined, paginationInfo.currentPage + 1);
    const newComicList = comicSearchResult?.comics.concat(apiResponse.comics);
    if (newComicList) {
      const newResults: SearchResultDto = { ...comicSearchResult, comics: newComicList };
      setComicSearchResults(newResults);
      setPaginationInfo({ currentPage: apiResponse.currentPage, maxPage: apiResponse.maxPage });
    }
  };

  const readingListBottomScrollHandler = async () => {
    if (!readingListSearchResult) return;
    const apiResponse = await ComicCompanionAPIService.searchReadingLists(searchInput, undefined, undefined, paginationInfo.currentPage + 1);
    const newData = readingListSearchResult.data.concat(apiResponse.data);
    const newList: ReadingListSearchResultAPIResponse = { ...readingListSearchResult, data: newData };
    setReadingListSearchResult(newList);
    if (apiResponse.maxPage && apiResponse.pageNumber) {
      setPaginationInfo({ currentPage: apiResponse.pageNumber, maxPage: apiResponse.maxPage });
    }
  };

  const handleBottomScroll = () => {
    if (paginationInfo.currentPage !== paginationInfo.maxPage) {
      if (props.typeOfSearch === "Comics") {
        comicBottomScrollHandler();
      } else if (props.typeOfSearch === "Reading Lists") {
        readingListBottomScrollHandler();
      }
    }
  };
  useBottomScrollListener(handleBottomScroll);

  // one of these is the function that will be called to actually search whatever the result is

  // this handles searching for comics and structuring them for the SearchResult component
  const handleSearchComics = async () => {
    try {
      if (searchInput) {
        const apiResponse = await ComicCompanionAPIService.searchComics(searchInput, undefined);
        console.log(apiResponse);
        setPaginationInfo({ currentPage: apiResponse.currentPage, maxPage: apiResponse.maxPage });
        if (apiResponse.comics.length === 0) {
          throw new Error("Unable to get comics");
        }
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
        if (response.data.length === 0) {
          throw new Error("Unable to get reading lists");
        }
        setReadingListSearchResult(response);
        if (response.maxPage && response.pageNumber) {
          setPaginationInfo({ maxPage: response.maxPage, currentPage: response.pageNumber });
        }
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
