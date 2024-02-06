import { List, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/store";
import { toggleModal, setContent } from "../../redux/modalSlice";
import { useNavigate } from "react-router-dom";

import "../../styles/SettingsPage.css";
import SignOutButton from "../Utility/SignOutButton";
export default function SettingsPage() {
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const toggleSignInModal = () => {
    dispatch(setContent({ type: "User Auth" }));
    dispatch(toggleModal(true));
  };

  const handleUserSettingsClick = () => {
    if (!currentUser) {
      toggleSignInModal();
      return;
    } else {
      nav("/account");
    }
  };

  const handleLibrarySettingsClick = () => {
    nav("/settings/library");
  };

  return (
    <>
      <div>
        <h1>Settings</h1>
      </div>
      {currentUser ? (
        <SignOutButton />
      ) : (
        <p className="settings-link" onClick={toggleSignInModal}>
          Sign In
        </p>
      )}
      <List>
        <ListItemButton onClick={handleUserSettingsClick}>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>User Settings</ListItemText>
          </ListItem>
        </ListItemButton>
        <ListItemButton onClick={handleLibrarySettingsClick}>
          <ListItem>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText>Library Settings</ListItemText>
          </ListItem>
        </ListItemButton>
      </List>
    </>
  );
}
