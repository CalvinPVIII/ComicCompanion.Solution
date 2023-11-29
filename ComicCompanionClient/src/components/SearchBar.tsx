import { Input } from "@chakra-ui/react";
import { MouseEvent, useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  searchCallback: (searchInput: string) => void;
  searchOnInputChange: boolean;
  searchOnInputChangeCallback?: () => void;
}

export default function SearchBar(props: SearchBarProps) {
  const [searchInput, setSearchInput] = useState<string>("");

  const stopClickPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (props.searchOnInputChange) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchInput, props.searchOnInputChange]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
