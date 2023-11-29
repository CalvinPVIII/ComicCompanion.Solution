import "../styles/Header.css";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import UserAuthModal from "./UserManagement/AuthModal";

import { userSelector } from "../redux/userReducer";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setUser } from "../redux/userReducer";
import SearchBar from "./SearchBar";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const nav = useNavigate();

  const handleSearch = (searchInput: string) => {
    nav(`/search/${searchInput}`);
  };

  const handleHeaderClick = () => {
    nav("/");
  };

  const handleSignOut = () => {
    dispatch(setUser(null));
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
                  <SearchBar searchCallback={handleSearch} searchOnInputChange={false} />
                </Box>
              </MenuItem>
              <MenuItem backgroundColor={"blackAlpha.900"}>
                {user ? (
                  <>
                    <Link to="/user">{user.email}</Link> | <span onClick={handleSignOut}> Sign Out </span>
                  </>
                ) : (
                  <>
                    <Box px="3" onClick={onOpen}>
                      <span>Log In</span> | <span>Register</span>
                    </Box>
                  </>
                )}
              </MenuItem>
              <MenuItem backgroundColor={"blackAlpha.900"}>
                <Box px="3">
                  <Link to="/readinglists">Browse Reading Lists</Link>
                </Box>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
}
