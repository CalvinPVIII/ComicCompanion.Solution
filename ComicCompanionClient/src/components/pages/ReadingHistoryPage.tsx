import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "../../styles/ReadingHistoryPage.css";
import { useSelector } from "react-redux";
import { readingHistorySelector } from "../../redux/store";
import { List, Collapse, ListItem } from "@mui/material";
import { useState } from "react";

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
          <h3>Comic History</h3>
        </ListItem>
        <Collapse in={comicHistoryOpen} unmountOnExit timeout="auto">
          {Object.keys(history).map((comic) => (
            <ReadingHistoryItemsList history={history[comic]} comic={comic} key={comic} />
          ))}
        </Collapse>
        <ListItem onClick={toggleReadingListCollapse}>
          <h3>Reading List History</h3>
        </ListItem>

        <Collapse>
          {Object.values(listHistory).map((readingListItem, index) => (
            <ReadingListHistoryList list={readingListItem} key={index} />
          ))}
        </Collapse>
      </List>
    </>
  );
}
