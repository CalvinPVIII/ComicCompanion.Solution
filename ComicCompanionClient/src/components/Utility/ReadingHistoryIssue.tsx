import { ListItemButton, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { HistoryItem } from "../../redux/readingHistorySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeIssueFromHistory } from "../../redux/readingHistorySlice";
import "../../styles/ReadingHistoryIssue.css";
import { useNavigate } from "react-router-dom";

interface ReadingHistoryIssueProps {
  issue: HistoryItem;
}

export default function ReadingHistoryIssue(props: ReadingHistoryIssueProps) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const toggleConfirm = () => setShowConfirm(!showConfirm);
  const { issue } = props;
  const handleDelete = () => {
    dispatch(removeIssueFromHistory(issue.issue));
    toggleConfirm();
  };

  const handleNav = () => {
    nav(`/comics/${issue.issue.comicId}/issue/${issue.issue.issueId}`);
  };

  return (
    <div className="history-issue-item">
      <ListItemButton key={issue.issue.issueId}>
        <div className="history-list-item">
          <img
            className="reading-history-issue-img"
            alt={`${issue.issue.comicId} issue ${issue.issue.issueId} `}
            src={issue.issue.cover}
            onClick={handleNav}
          />
          <div className="history-item-text" onClick={handleNav}>
            <p className="history-text-primary">{`${issue.issue.comicId} issue ${issue.issue.issueId} `}</p>
            <p className="history-text-secondary">{`Page ${issue.pagesRead}`}</p>
          </div>

          <div className="history-item-delete">
            {!showConfirm ? (
              <ClearIcon onClick={toggleConfirm} />
            ) : (
              <div className="history-confirm-buttons">
                <Button color="success" onClick={handleDelete}>
                  Confirm
                </Button>
                <Button color="error" onClick={toggleConfirm}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </ListItemButton>
    </div>
  );
}
