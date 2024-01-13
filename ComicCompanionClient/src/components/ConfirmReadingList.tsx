import "../styles/ConfirmReadingList.css";
import { useSelector } from "react-redux";
import { currentListSelector } from "../redux/store";
import { Button } from "@mui/material";
export default function ConfirmReadingList() {
  const readingList = useSelector(currentListSelector);
  if (readingList) {
    return (
      <div id="confirm-reading-list-modal">
        <h1>{readingList.name}</h1>
        <p>{readingList.description}</p>

        <h3>Pick a cover image</h3>
        <div id="cover-image-picker">
          <div id="confirm-issues-list">
            {readingList.issues.map((issue) => (
              <p>
                {issue.comicId} - {issue.issueId}
              </p>
            ))}
          </div>

          {readingList.coverImg ? <img src={readingList.coverImg} alt="cover image" /> : <div id="reading-list-cover-image-placeholder">?</div>}
        </div>

        <div id="confirm-buttons">
          <Button variant="contained" color="success">
            Create
          </Button>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
