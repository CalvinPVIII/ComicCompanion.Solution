import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import { Link } from "react-router-dom";
import { APP_VERSION } from "../../helpers/constants";

export default function AppInfoPage() {
  return (
    <>
      <div className="settings-header">
        <Link to="/dashboard">
          <ArrowBackIcon />
        </Link>
        <h2>App Info</h2>
      </div>
      <List>
        <ListItemButton>
          <ListItem>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Version {APP_VERSION}</ListItemText>
          </ListItem>
        </ListItemButton>
        <a href="https://github.com/CalvinPVIII/ComicCompanion.Solution/issues" target="_blank">
          <ListItemButton>
            <ListItem>
              <ListItemIcon>
                <BugReportOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Bugs and Feature Requests" secondary="Submit bug reports and feature requests on Github" />
            </ListItem>
          </ListItemButton>
        </a>
      </List>
    </>
  );
}
