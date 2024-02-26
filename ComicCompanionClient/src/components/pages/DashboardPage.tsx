import { List, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import CodeIcon from "@mui/icons-material/Code";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HistoryIcon from "@mui/icons-material/History";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
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

  return (
    <>
      <div>
        <h1>Dashboard</h1>
      </div>

      <div>
        <List>
          {currentUser ? (
            <ListItemButton>
              <ListItem>
                <SignOutButton />
              </ListItem>
            </ListItemButton>
          ) : (
            <ListItemButton onClick={toggleSignInModal}>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>Sign In</ListItemText>
              </ListItem>
            </ListItemButton>
          )}
          <Link to="/lists/new">
            <ListItemButton>
              <ListItem>
                <ListItemIcon>
                  <AddCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText>{isCreating ? "Edit Reading List" : "Create Reading List"}</ListItemText>
              </ListItem>
            </ListItemButton>
          </Link>
          <Link to="/lists/created">
            <ListItemButton>
              <ListItem>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText>Created Reading Lists</ListItemText>
              </ListItem>
            </ListItemButton>
          </Link>
        </List>
        <Link to="/settings/history">
          <ListItemButton>
            <ListItem>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText>History</ListItemText>
            </ListItem>
          </ListItemButton>
        </Link>
        <Link to="/settings/appinfo">
          <ListItemButton>
            <ListItem>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText>App Info</ListItemText>
            </ListItem>
          </ListItemButton>
        </Link>
      </div>

      <h2>Settings</h2>
      <List>
        <Link to="/settings/general">
          <ListItemButton>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="General Settings" secondary={"Hide/Adjust App Features"} />
            </ListItem>
          </ListItemButton>
        </Link>
        <Link to="/settings/library">
          <ListItemButton>
            <ListItem>
              <ListItemIcon>
                <CollectionsBookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Library Settings" secondary={"Adjust Categories"} />
            </ListItem>
          </ListItemButton>
        </Link>
        <ListItemButton onClick={handleUserSettingsClick}>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User Settings" secondary={"Change User Name/Email/Password"} />
          </ListItem>
        </ListItemButton>
        <Link to="/settings/advanced">
          <ListItemButton>
            <ListItem>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Advanced Settings" secondary={"Manual Library Sync"} />
            </ListItem>
          </ListItemButton>
        </Link>
      </List>
    </>
  );
}
