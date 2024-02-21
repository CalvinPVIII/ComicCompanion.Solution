import { List, ListItemButton, ListItem, ListItemText } from "@mui/material";
import Switch from "@mui/material/Switch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { settingsSelector } from "../../redux/store";
import { toggleHideCreatedCategory, toggleHideEditFab, toggleDefaultLibraryPage } from "../../redux/settingsSlice";
import { useState } from "react";
import SelectOptionModal from "../Utility/SelectOptionModal";
export default function GeneralSettingsPage() {
  const currentSettings = useSelector(settingsSelector);
  const dispatch = useDispatch();
  const [defaultLibraryOptionsModal, setDefaultLibraryOptionsModal] = useState(true);
  const openLibraryOptionsModal = () => setDefaultLibraryOptionsModal(true);
  const handleLibraryOptionsModalClose = (selectedOption: string) => {
    setDefaultLibraryOptionsModal(false);
    if (selectedOption === "comics" || selectedOption === "reading lists") {
      dispatch(toggleDefaultLibraryPage(selectedOption));
    }
  };

  const handleHideCreatedClick = () => {
    dispatch(toggleHideCreatedCategory(!currentSettings.hideCreatedCategory));
  };

  const handleHideFab = () => {
    dispatch(toggleHideEditFab(!currentSettings.hideEditFAB));
  };

  return (
    <>
      <SelectOptionModal
        open={defaultLibraryOptionsModal}
        closeCallback={handleLibraryOptionsModalClose}
        options={["comics", "reading lists"]}
        header="Set Default Library Page"
        defaultOption={currentSettings.defaultLibraryPage}
      />
      <div className="settings-header">
        <Link to="/dashboard">
          <ArrowBackIcon />
        </Link>
        <h2>General Settings</h2>
      </div>
      <List>
        <ListItemButton onClick={handleHideCreatedClick}>
          <ListItem>
            <ListItemText primary="Hide Created Category" secondary={`Will not show the "Created" category in the reading list library`} />
          </ListItem>
          <Switch checked={currentSettings.hideCreatedCategory} />
        </ListItemButton>

        <ListItemButton onClick={handleHideFab}>
          <ListItem>
            <ListItemText
              primary="Hide Reading List Floating Action Button"
              secondary={`Hides the floating action button from appearing on all pages when creating a reading list`}
            />
          </ListItem>
          <Switch checked={currentSettings.hideEditFAB} />
        </ListItemButton>
        <ListItemButton onClick={openLibraryOptionsModal}>
          <ListItem>
            <ListItemText primary="Default Library Page" secondary={`Have the library open to the Comics or Reading Lists page by default`} />
          </ListItem>
          <p className="capitalized-text">{currentSettings.defaultLibraryPage}</p>
        </ListItemButton>
      </List>
    </>
  );
}
