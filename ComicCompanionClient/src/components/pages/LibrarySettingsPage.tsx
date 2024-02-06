import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "../../styles/LibrarySettingsPage.css";
import { List, ListItemButton, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useSelector } from "react-redux";
import { librarySelector } from "../../redux/store";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function LibrarySettingsPage() {
  const [catSettingsOpen, setCatSettingsOpen] = useState(false);

  const library = useSelector(librarySelector);

  const handleToggleCatSettings = () => setCatSettingsOpen(!catSettingsOpen);
  console.log(library);
  return (
    <>
      <div className="settings-header">
        <Link to="/settings">
          <ArrowBackIcon />
        </Link>
        <h2>Library Settings</h2>
      </div>
      <div>
        <List>
          <ListItemButton onClick={handleToggleCatSettings}>
            <ListItem>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText>Manage Categories</ListItemText>
              {catSettingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </ListItemButton>
          <Collapse in={catSettingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {Object.values(library.libraryCategories).map((cat) => (
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={cat.tagName} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    </>
  );
}
