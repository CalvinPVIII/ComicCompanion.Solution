import { Input } from "@chakra-ui/react";
import { MouseEvent, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  searchCallback: (searchInput: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");

  const stopClickPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    props.searchCallback(searchInput);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      <form style={{ display: "flex" }} onSubmit={handleSearch}>
        <Input placeholder="Search Comics" size="sm" variant="filled" onClick={stopClickPropagation} onChange={handleSearchInput} />
        <SearchIcon style={{ margin: "10px" }} onClick={handleSearch} />
      </form>
    </>
  );
}
