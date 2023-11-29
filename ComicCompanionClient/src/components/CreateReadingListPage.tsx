import SearchBar from "./SearchBar";
import { useState } from "react";
import SearchResults from "./SearchResults";
import { Spinner } from "@chakra-ui/react";

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
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </>
      ) : (
        <>
          <SearchResults searchQuery={query} />
        </>
      )}
    </>
  );
}
