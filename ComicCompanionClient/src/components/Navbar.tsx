import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation, Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function NavBar() {
  const location = useLocation();

  const ICON_VALUES = {
    home: 0,
    lists: 1,
    comics: 2,
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
    <div className="bottom-nav">
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Reading Lists" icon={<ListAltIcon />} component={Link} to="/lists" />
        <BottomNavigationAction label="Comics" icon={<MenuBookIcon />} component={Link} to="/comics" />
      </BottomNavigation>
    </div>
  );
}
