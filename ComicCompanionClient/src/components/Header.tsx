import "../styles/Header.css";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Input, Box } from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import UserAuthModal from "./UserManagement/AuthModal";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const stopClickPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const nav = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    nav(`/search/${searchInput}`);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleHeaderClick = () => {
    nav("/");
  };

  return (
    <>
      <div id="header">
        <UserAuthModal isOpen={isOpen} onClose={onClose} />
        <h1 onClick={handleHeaderClick}>Comic Companion</h1>
        <div id="menu">
          <Menu closeOnSelect={false}>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} />
            <MenuList backgroundColor={"blackAlpha.900"}>
              <MenuItem backgroundColor={"blackAlpha.900"}>
                <Box>
                  <form style={{ display: "flex" }} onSubmit={handleSearch}>
                    <Input placeholder="Search Comics" size="sm" variant="filled" onClick={stopClickPropagation} onChange={handleSearchInput} />
                    <SearchIcon style={{ margin: "10px" }} onClick={handleSearch} />
                  </form>
                </Box>
              </MenuItem>
              <MenuItem backgroundColor={"blackAlpha.900"}>
                <Box px="3" onClick={onOpen}>
                  <span>Log In</span> | <span>Register</span>
                </Box>
              </MenuItem>
              <MenuItem backgroundColor={"blackAlpha.900"}>
                <Box px="3">Browse Reading Lists</Box>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
}
