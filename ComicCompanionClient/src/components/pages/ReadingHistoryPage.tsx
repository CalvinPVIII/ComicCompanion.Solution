import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "../../styles/ReadingHistoryPage.css";
import { useSelector } from "react-redux";
import { readingHistorySelector } from "../../redux/store";
import { List, Collapse, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import ReadingHistoryItemsList from "../Utility/ReadingHistoryItemsList";
import ReadingListHistoryList from "../Utility/ReadingListHistoryList";
export default function ReadingHistoryPage() {
  const history = useSelector(readingHistorySelector).history;
  const listHistory = useSelector(readingHistorySelector).readingListHistory;
  const [comicHistoryOpen, setComicHistoryOpen] = useState(false);
  const toggleComicCollapse = () => setComicHistoryOpen(!comicHistoryOpen);
  const [listHistoryOpen, setListHistoryOpen] = useState(false);
  const toggleReadingListCollapse = () => setListHistoryOpen(!listHistoryOpen);

  return (
    <>
      <div className="settings-header">
        <Link to="/dashboard">
          <ArrowBackIcon />
        </Link>
        <h2>History</h2>
      </div>
      <List>
        <ListItem onClick={toggleComicCollapse}>
          <ListItemText>
            <h3>Comic History</h3>
          </ListItemText>
          {comicHistoryOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={comicHistoryOpen} unmountOnExit timeout="auto">
          {Object.keys(history).map((comic) => (
            <ReadingHistoryItemsList history={history[comic]} comic={comic} key={comic} />
          ))}
        </Collapse>
        <ListItem onClick={toggleReadingListCollapse}>
          <ListItemText>
            <h3>Reading List History</h3>
          </ListItemText>
          {listHistoryOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={listHistoryOpen} unmountOnExit timeout="auto">
          {Object.values(listHistory).map((readingListItem, index) => (
            <ReadingListHistoryList list={readingListItem} key={index} />
          ))}
        </Collapse>
      </List>
    </>
  );
}
