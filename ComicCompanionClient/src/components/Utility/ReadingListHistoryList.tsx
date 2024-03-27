import { useState } from "react";
import { ReadingListHistoryItem } from "../../redux/readingHistorySlice";
import { Avatar, Button, Collapse, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteReadingListFromHistory } from "../../redux/readingHistorySlice";
import ClearIcon from "@mui/icons-material/Clear";
import ReadingListHistoryIssuesList from "./ReadingListHistoryIssuesList";

interface ReadingListHistoryListProps {
  list: ReadingListHistoryItem;
}

export default function ReadingListHistoryList(props: ReadingListHistoryListProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const toggleConfirmDelete = () => setConfirmDelete(!confirmDelete);
  const [issuesListOpen, setIssuesListOpen] = useState(false);
  const toggleIssuesList = () => setIssuesListOpen(!issuesListOpen);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReadingListFromHistory(props.list.listId as string));
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
        <ListItemAvatar>
          <Avatar src={props.list.coverImg} />
        </ListItemAvatar>
        <ListItemText primary={props.list.name} secondary={`${Object.values(props.list.readIssues).length} issues read`} onClick={toggleIssuesList} />
      </ListItem>
      <Collapse in={issuesListOpen} timeout="auto" unmountOnExit>
        <ReadingListHistoryIssuesList issues={Object.values(props.list.readIssues)} listId={props.list.listId} />
      </Collapse>
    </>
  );
}
