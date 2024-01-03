import { SearchResultAPIResponse } from "../../types";

interface SearchResultProps {
  searchResult: SearchResultAPIResponse;
}

export default function SearchResult(props: SearchResultProps) {
  console.log(props);
  return (
    <>
      <h1>Search Result</h1>
    </>
  );
}
