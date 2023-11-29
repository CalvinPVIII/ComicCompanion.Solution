import SearchBar from "./SearchBar";
import { useState } from "react";
import SearchResults from "./SearchResults";

export default function CreateReadingListPage() {
  const [searching, setSearching] = useState<boolean | null>();
  const [query, setQuery] = useState("");
  const handleSearch = (searchQuery: string) => {
    console.log(searchQuery);
    // fetch stuff
    setQuery(searchQuery);
    setSearching(false);
  };

  const onInputChange = () => {
    setSearching(true);
  };

  return (
    <>
      <SearchBar searchCallback={handleSearch} searchOnInputChange={true} searchOnInputChangeCallback={onInputChange} />
      {searching ? (
        <>
          <h1>Searching</h1>
        </>
      ) : (
        <>
          <h1>done searching</h1>
          <SearchResults searchQuery={query} />
        </>
      )}
    </>
  );
}
