import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function NavBar() {
  const location = useLocation();

  const ICON_VALUES = {
    home: 0,
    lists: 1,
    comics: 2,
    dashboard: 3,
    settings: 4,
  };

  const value =
    location.pathname === "/"
      ? ICON_VALUES.home
      : location.pathname.includes("/list")
      ? ICON_VALUES.lists
      : location.pathname.includes("/comic")
      ? ICON_VALUES.comics
      : location.pathname.includes("/dashboard")
      ? ICON_VALUES.dashboard
      : location.pathname.includes("/settings")
      ? ICON_VALUES.settings
      : ICON_VALUES.home;

  return (
    <>
      {location.pathname.includes("/issue") ? (
        <></>
      ) : (
        <div className="bottom-nav">
          <BottomNavigation showLabels value={value}>
            <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction component={Link} to="/lists" label="Lists" icon={<ListAltIcon />} />
            <BottomNavigationAction component={Link} to="/comics" label="Comics" icon={<MenuBookIcon />} />
            <BottomNavigationAction component={Link} to="/dashboard" label="Dashboard" icon={<AccountCircleIcon />} />
            <BottomNavigationAction component={Link} to="/settings" label="Settings" icon={<SettingsIcon />} />
          </BottomNavigation>
        </div>
      )}
    </>
  );
}
