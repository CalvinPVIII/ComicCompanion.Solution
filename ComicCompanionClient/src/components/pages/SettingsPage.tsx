import { List, ListItem, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/store";
import { toggleModal, setContent } from "../../redux/modalSlice";

import "../../styles/SettingsPage.css";
import SignOutButton from "../Utility/SignOutButton";
export default function SettingsPage() {
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(setContent({ type: "User Auth" }));
    dispatch(toggleModal(true));
  };
  return (
    <>
      <div>
        <h1>Settings</h1>
      </div>
      {currentUser ? (
        <SignOutButton />
      ) : (
        <p className="settings-link" onClick={handleSignIn}>
          Sign In
        </p>
      )}
      <List>
        <ListItemButton>
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
