import { ListItemButton, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ReadingListHistoryIssue } from "../../redux/readingHistorySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteIssueFromReadingListHistory } from "../../redux/readingHistorySlice";
import "../../styles/ReadingHistoryIssue.css";
import { useNavigate } from "react-router-dom";

interface ReadingListHistoryIssueItemProps {
  issue: ReadingListHistoryIssue;
  listId: string | number;
}

export default function ReadingListHistoryIssueItem(props: ReadingListHistoryIssueItemProps) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const toggleConfirm = () => setShowConfirm(!showConfirm);
  const { issue } = props;
  const handleDelete = () => {
    dispatch(deleteIssueFromReadingListHistory({ comicAndIssueId: issue.comicId + issue.issueId, listId: props.listId as string }));
    toggleConfirm();
  };

  const handleNav = () => {
    nav(`/lists/${props.listId}/comics/${issue.comicId}/issue/${issue.issueId}`);
  };

  return (
    <div className="history-issue-item">
      <ListItemButton key={issue.issueId}>
        <div className="history-list-item">
          <img className="reading-history-issue-img" alt={`${issue.comicId} issue ${issue.issueId} `} src={issue.coverImg} onClick={handleNav} />
          <div className="history-item-text" onClick={handleNav}>
            <p className="history-text-primary">{`${issue.comicId} issue ${issue.issueId} `}</p>
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
