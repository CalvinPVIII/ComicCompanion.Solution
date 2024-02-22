import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "../../styles/ReadingHistoryPage.css";
import { useSelector } from "react-redux";
import { readingHistorySelector } from "../../redux/store";
import { List } from "@mui/material";

import ReadingHistoryItemsList from "../Utility/ReadingHistoryItemsList";
export default function ReadingHistoryPage() {
  const history = useSelector(readingHistorySelector).history;

  return (
    <>
      <div className="settings-header">
        <Link to="/dashboard">
          <ArrowBackIcon />
        </Link>
        <h2>History</h2>
      </div>
      <List>
        {Object.keys(history).map((comic) => (
          <ReadingHistoryItemsList history={history[comic]} comic={comic} key={comic} />
        ))}
      </List>
    </>
  );
}
