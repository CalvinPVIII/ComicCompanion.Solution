import "../styles/Header.css";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Input, Box } from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");

  const stopClickPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const nav = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/search/${searchInput}`);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleHeaderClick = () => {
    nav("/");
  };

  return (
    <div id="header">
      <span></span>
      <h1 onClick={handleHeaderClick}>Comic Companion</h1>
      <div id="menu">
        <Menu closeOnSelect={false}>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} />
          <MenuList backgroundColor={"black.100"}>
            <MenuItem backgroundColor={"black.100"}>
              <Box>
                <form style={{ display: "flex" }} onSubmit={handleSearch}>
                  <Input placeholder="Search Comics" size="sm" variant="filled" onClick={stopClickPropagation} onChange={handleSearchInput} />
                  <SearchIcon style={{ margin: "10px" }} onClick={handleSearch} />
                </form>
              </Box>
            </MenuItem>
            <MenuItem backgroundColor={"black.100"}>
              <Box px="3">Log In</Box>
            </MenuItem>
            <MenuItem backgroundColor={"black.100"}>
              <Box px="3">Browse Reading Lists</Box>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
