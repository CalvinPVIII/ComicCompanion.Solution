import { List, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/store";
import { toggleModal, setContent } from "../../redux/modalSlice";
import { Link, useNavigate } from "react-router-dom";
import { isCreatingSelector } from "../../redux/store";

import "../../styles/DashboardPage.css";
import SignOutButton from "../Utility/SignOutButton";
export default function DashboardPage() {
  const currentUser = useSelector(userSelector);
  const isCreating = useSelector(isCreatingSelector);

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
        <h1>Dashboard</h1>
      </div>
      {currentUser ? (
        <SignOutButton />
      ) : (
        <p className="settings-link" onClick={toggleSignInModal}>
          Sign In
        </p>
      )}
      <div>
        <h3 className="link">
          <Link to="/lists/new">{isCreating ? "Edit Current Reading List" : "Create New Reading List"}</Link>
        </h3>
      </div>

      <h2>Settings</h2>
      <List>
        <ListItemButton onClick={handleLibrarySettingsClick}>
          <ListItem>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText>Library Settings</ListItemText>
          </ListItem>
        </ListItemButton>
        <ListItemButton onClick={handleUserSettingsClick}>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>User Settings</ListItemText>
          </ListItem>
        </ListItemButton>
      </List>
    </>
  );
}