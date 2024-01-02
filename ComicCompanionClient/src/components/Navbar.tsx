import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const nav = useNavigate();

  const ICON_VALUES = {
    home: 0,
    lists: 1,
    comics: 2,
  };

  console.log(location.pathname);

  const handleNav = (page: string) => {
    nav(page);
  };

  const value =
    location.pathname === "/"
      ? ICON_VALUES.home
      : location.pathname.includes("/list")
      ? ICON_VALUES.lists
      : location.pathname.includes("/comic")
      ? ICON_VALUES.comics
      : ICON_VALUES.home;

  return (
    <>
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => handleNav("/")} />
        <BottomNavigationAction label="Reading Lists" icon={<ListAltIcon />} onClick={() => handleNav("/lists")} />
        <BottomNavigationAction label="Comics" icon={<MenuBookIcon />} onClick={() => handleNav("/comics")} />
      </BottomNavigation>
    </>
  );
}
