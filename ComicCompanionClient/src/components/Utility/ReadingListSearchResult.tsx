import { ReadingListSearchResultAPIResponse } from "../../types";
import "../../styles/SearchResult.css";

interface ReadingListSearchResultProps {
  searchResult: ReadingListSearchResultAPIResponse;
}

export default function ReadingListSearchResult(props: ReadingListSearchResultProps) {
  console.log(props);
  return <>result</>;
}
