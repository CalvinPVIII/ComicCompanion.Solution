import { Badge, Button, Fab } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { removeIssue, updateProperty } from "../redux/listCreationSlice";
import { useSelector, useDispatch } from "react-redux";
import { isCreatingSelector, currentListSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/ReadingListFAB.css";
import { Issue } from "../types";

export default function ReadingListFAB() {
  const isCreating = useSelector(isCreatingSelector);
  const currentList = useSelector(currentListSelector);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [menuVisible, setMenuVisible] = useState<boolean>(true);

  const handleRemoveIssue = (issue: Issue) => {
    console.log(issue);
    dispatch(removeIssue(issue));
  };

  const handleFinalize = () => {
    nav("/lists/new");
    setMenuVisible(false);
  };

  if (isCreating && currentList) {
    return (
      <>
        <div className="reading-list-fab">
          <Badge badgeContent={currentList.issues.length} color="warning">
            <Fab color="primary" onClick={() => setMenuVisible(!menuVisible)}>
              <Edit />
            </Fab>
          </Badge>
        </div>
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
            <Button variant="contained" color="success" onClick={handleFinalize}>
              Finalize
            </Button>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
