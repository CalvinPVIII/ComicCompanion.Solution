import { useSelector, useDispatch } from "react-redux";

import { currentListSelector } from "../../redux/store";
import { removeIssue } from "../../redux/listCreationSlice";
import { Button } from "@mui/material";
import { Issue } from "../../types";

export default function IssuesInCreatingReadingList() {
  const issues = useSelector(currentListSelector)?.issues;
  const dispatch = useDispatch();

  const handleRemove = (issue: Issue) => {
    dispatch(removeIssue(issue));
  };
  if (issues) {
    return (
      <div>
        {issues.map((issue) => (
          <>
            <p>
              {issue.comicId} - {issue.issueId}
            </p>
            <Button variant="contained" color="error" onClick={() => handleRemove(issue)}>
              Remove
            </Button>
          </>
        ))}
      </div>
    );
  }
}
