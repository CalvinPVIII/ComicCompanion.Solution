import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Navbar() {
  const nav = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/search/${searchInput}`);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="search" id="search-bar" value={searchInput} onChange={handleSearchInput} />
        <button onClick={handleSearch} type="submit">
          Search
        </button>
      </form>
    </>
  );
}
