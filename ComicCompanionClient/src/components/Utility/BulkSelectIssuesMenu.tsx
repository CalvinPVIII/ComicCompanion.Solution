import { Button } from "@mui/material";
import { BookmarkAddOutlined, Clear, BookmarkRemoveOutlined, AddOutlined } from "@mui/icons-material";
import "../../styles/BulkSelectIssuesMenu.css";

interface BulkSelectIssuesMenuProps {
  handleStopSelecting: () => void;
  handleSelectAllIssues: () => void;
  handleMarkAllAsRead: () => void;
  handleBulkAddToReadingList?: () => void;
}

export default function BulkSelectIssuesMenu(props: BulkSelectIssuesMenuProps) {
  return (
    <>
      <div id="select-issue-menu-top-bar">
        <Clear onClick={props.handleStopSelecting} />
        <p>Select Issues</p>
        <Button onClick={props.handleSelectAllIssues}>Select All</Button>
      </div>
      <div id="select-issue-menu-bottom-bar">
        <div className="bulk-select-issue-button">
          <BookmarkAddOutlined />
          <Button color="secondary" onClick={props.handleMarkAllAsRead}>
            Mark as Read
          </Button>
        </div>
        <div className="bulk-select-issue-button">
          <BookmarkRemoveOutlined />
          <Button color="secondary">Mark as Unread</Button>
        </div>
        {props.handleBulkAddToReadingList ? (
          <div className="bulk-select-issue-button">
            <AddOutlined />
            <Button color="secondary" onClick={props.handleBulkAddToReadingList}>
              Add to Reading List
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
}
