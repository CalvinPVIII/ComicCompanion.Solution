import { Badge, Button, Fab } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { removeIssue, updateProperty } from "../redux/listCreationSlice";
import { useSelector, useDispatch } from "react-redux";
import { isCreatingSelector, currentListSelector } from "../redux/store";
import { useState } from "react";

import "../styles/ReadingListFAB.css";
import { Issue } from "../types";

export default function ReadingListFAB() {
  const isCreating = useSelector(isCreatingSelector);
  const currentList = useSelector(currentListSelector);
  const dispatch = useDispatch();

  const [menuVisible, setMenuVisible] = useState<boolean>(true);

  const handleRemoveIssue = (issue: Issue) => {
    console.log(issue);
  };

  if (isCreating && currentList) {
    return (
      <div className="reading-list-fab">
        {menuVisible ? (
          <div className="reading-list-fab-menu">
            <h1>{currentList.name}</h1>
            {currentList.issues.map((issue) => (
              <div className="reading-list-fab-issues">
                <p>
                  {issue.comicId} - {issue.issueId}
                </p>
                <Button variant="outlined" color="error" onClick={() => handleRemoveIssue(issue)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="contained" color="success">
              Finalize
            </Button>
          </div>
        ) : (
          <></>
        )}
        <Badge badgeContent={currentList.issues.length} color="success">
          <Fab color="primary" onClick={() => setMenuVisible(!menuVisible)}>
            <Edit />
          </Fab>
        </Badge>
      </div>
    );
  }
}
