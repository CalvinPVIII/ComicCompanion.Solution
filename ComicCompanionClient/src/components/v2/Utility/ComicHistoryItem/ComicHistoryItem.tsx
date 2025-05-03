import { Avatar, ListItem, ListItemAvatar, ListItemText, Collapse, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// import ReadingHistoryIssuesList from "./ReadingHistoryIssuesList";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteHistoryItem, HistoryItem } from "../../../../redux/readingHistorySlice";
import loadImg from "../../../../helpers/loadImg";
interface ReadingHistoryItemsListProps {
  historyItem: HistoryItem;
  isReadingList: boolean;
}

export default function ComicHistoryItem(props: ReadingHistoryItemsListProps) {
  const dispatch = useDispatch();
  const { historyItem, isReadingList } = props;
  const [issuesListOpen, setIssuesListOpen] = useState(false);
  const toggleIssuesList = () => setIssuesListOpen(!issuesListOpen);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const toggleConfirmDelete = () => setConfirmDelete(!confirmDelete);

  const handleDelete = () => {
    dispatch(deleteHistoryItem({ isReadingListItem: isReadingList, itemId: historyItem.historyItemId }));
    toggleConfirmDelete();
  };
  console.log(historyItem);

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
          <Avatar src={loadImg(historyItem.img || "")} />
        </ListItemAvatar>
        <ListItemText primary={historyItem.historyItemName} secondary={`${Object.values(history).length} issues read`} onClick={toggleIssuesList} />
      </ListItem>
      <Collapse in={issuesListOpen} timeout="auto" unmountOnExit>
        {/* <ReadingHistoryIssuesList issues={Object.values(history)} /> */}
      </Collapse>
    </>
  );
}
