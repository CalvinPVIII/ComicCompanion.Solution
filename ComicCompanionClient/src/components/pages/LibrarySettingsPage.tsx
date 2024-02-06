import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "../../styles/LibrarySettingsPage.css";
import { List, ListItemButton, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { librarySelector } from "../../redux/store";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ManageCategoryItem from "../Utility/ManageCategoryItem";
import NewCategoryModal from "../Utility/NewCategoryModal";

export default function LibrarySettingsPage() {
  const [catSettingsOpen, setCatSettingsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

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
      <NewCategoryModal open={modalOpen} setClose={handleClose} />
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
              <ListItemButton sx={{ pl: 6 }} onClick={handleOpen}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <p>Add Category</p>
              </ListItemButton>
              {Object.values(library.libraryCategories).map((cat, index) => (
                <ListItemButton sx={{ pl: 6 }} key={index}>
                  <ManageCategoryItem info={cat} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    </>
  );
}
