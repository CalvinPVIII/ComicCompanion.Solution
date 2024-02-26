import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import { Link } from "react-router-dom";

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
            <ListItemText>App Version: Beta 1.0</ListItemText>
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
