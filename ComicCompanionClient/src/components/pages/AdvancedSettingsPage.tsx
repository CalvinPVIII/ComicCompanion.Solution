import { useSelector } from "react-redux";
import { userSelector, librarySelector } from "../../redux/store";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SyncIcon from "@mui/icons-material/Sync";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { updateLibraryAndSync, retrieveLibraryAndSync } from "../../helpers/helperFunctions";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { errorAlert, successAlert } from "../../helpers/alertCreators";
import { useDispatch } from "react-redux";

export default function AdvancedSettingsPage() {
  const currentUser = useSelector(userSelector);
  const library = useSelector(librarySelector);
  const dispatch = useDispatch();

  const forceSync = async () => {
    if (!currentUser) {
      errorAlert(dispatch, "You Must Sign In To Sync");
      return;
    }
    const syncResult = await updateLibraryAndSync(currentUser, library, dispatch);
    if (!syncResult) {
      errorAlert(dispatch, "There Was An Error Syncing");
    } else {
      successAlert(dispatch, "Library Updated");
    }
  };

  const retrieveSync = async () => {
    if (!currentUser) {
      errorAlert(dispatch, "You Must Sign In To Sync");
      return;
    }
    const syncResult = await retrieveLibraryAndSync(currentUser, dispatch);
    if (!syncResult) {
      errorAlert(dispatch, "There Was An Error Syncing");
    } else {
      successAlert(dispatch, "Library Updated");
    }
  };
  return (
    <>
      <div className="settings-header">
        <Link to="/dashboard">
          <ArrowBackIcon />
        </Link>
        <h2>Advanced Settings</h2>
      </div>

      <List>
        <ListItemButton onClick={forceSync}>
          <ListItem>
            <ListItemIcon>
              <SyncIcon />
            </ListItemIcon>
            <ListItemText primary="Force Local Library Sync" secondary={"Force the local library to overwrite the library synced to the server"} />
          </ListItem>
        </ListItemButton>

        <ListItemButton onClick={retrieveSync}>
          <ListItem>
            <ListItemIcon>
              <SystemUpdateAltIcon />
            </ListItemIcon>
            <ListItemText primary="Force Server Library Sync" secondary={"Force the server library to overwrite the local library"} />
          </ListItem>
        </ListItemButton>
      </List>
    </>
  );
}
