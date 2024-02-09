import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "../../styles/LibrarySettingsPage.css";
import { List, ListItemButton, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useSelector } from "react-redux";
import { librarySelector } from "../../redux/store";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ManageCategoryList from "../Utility/ManageCategoryList";

export default function LibrarySettingsPage() {
  const [comicCatSettingsOpen, setComicCatSettingsOpen] = useState(false);
  const [readingListCatSettingsOpen, setReadingListCatSettingsOpen] = useState(false);

  const library = useSelector(librarySelector);

  const handleToggleComicCatSettings = () => setComicCatSettingsOpen(!comicCatSettingsOpen);

  const handleToggleReadingListCatSettings = () => setReadingListCatSettingsOpen(!readingListCatSettingsOpen);

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
          <ListItemButton onClick={handleToggleComicCatSettings}>
            <ListItem>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText>Comic Categories</ListItemText>
              {comicCatSettingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </ListItemButton>
          <Collapse in={comicCatSettingsOpen} timeout="auto" unmountOnExit>
            <ManageCategoryList categories={Object.values(library.libraryCategories)} readingListOrComic="comic" />
          </Collapse>

          <ListItemButton onClick={handleToggleReadingListCatSettings}>
            <ListItem>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText>Reading List Categories</ListItemText>
              {readingListCatSettingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </ListItemButton>
          <Collapse in={readingListCatSettingsOpen} timeout="auto" unmountOnExit>
            <ManageCategoryList categories={Object.values(library.readingListCategories)} readingListOrComic="readingList" />
          </Collapse>
        </List>
      </div>
    </>
  );
}
