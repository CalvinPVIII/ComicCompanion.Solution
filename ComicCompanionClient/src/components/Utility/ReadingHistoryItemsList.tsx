import { Avatar, ListItem, ListItemAvatar, ListItemText, Collapse, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import ReadingHistoryIssuesList from "./ReadingHistoryIssuesList";
import { HistoryItem } from "../../redux/readingHistorySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeComicFromHistory } from "../../redux/readingHistorySlice";
interface ReadingHistoryItemsListProps {
  history: {
    [issueId: string]: HistoryItem;
  };
  comic: string;
}

export default function ReadingHistoryItemsList(props: ReadingHistoryItemsListProps) {
  const dispatch = useDispatch();
  const { history, comic } = props;
  const [issuesListOpen, setIssuesListOpen] = useState(false);
  const toggleIssuesList = () => setIssuesListOpen(!issuesListOpen);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const toggleConfirmDelete = () => setConfirmDelete(!confirmDelete);

  const handleDelete = () => {
    dispatch(removeComicFromHistory(comic));
    toggleConfirmDelete();
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            {!confirmDelete ? (
              <ClearIcon onClick={toggleConfirmDelete} />
            ) : (
              <div className="history-confirm-buttons">
                <Button color="success" onClick={handleDelete}>
                  Confirm
                </Button>
                <Button color="error" onClick={toggleConfirmDelete}>
                  Cancel
                </Button>
              </div>
            )}
          </>
        }
      >
        <ListItemAvatar onClick={toggleIssuesList}>
          <Avatar src={Object.values(history)[0].issue.cover} />
        </ListItemAvatar>
        <ListItemText primary={comic} secondary={`${Object.values(history).length} issues read`} onClick={toggleIssuesList} />
      </ListItem>
      <Collapse in={issuesListOpen} timeout="auto" unmountOnExit>
        <ReadingHistoryIssuesList issues={Object.values(history)} />
      </Collapse>
    </>
  );
}
