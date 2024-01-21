import { useSelector, useDispatch } from "react-redux";

import { currentListSelector } from "../../redux/store";
import { removeIssue } from "../../redux/listCreationSlice";
import { Button } from "@mui/material";
import { Issue } from "../../types";
import React from "react";

interface IssuesInCreatingReadingListProps {
  onClickCallback?: (issue: Issue) => void;
}

export default function IssuesInCreatingReadingList(props: IssuesInCreatingReadingListProps) {
  const issues = useSelector(currentListSelector)?.issues;
  const dispatch = useDispatch();

  const handleRemove = (issue: Issue) => {
    dispatch(removeIssue(issue));
  };

  const handleClick = (issue: Issue) => {
    if (!props.onClickCallback) return;
    props.onClickCallback(issue);
  };
  if (issues) {
    return (
      <div>
        {issues.map((issue, index) => (
          <React.Fragment key={index}>
            <p onClick={() => handleClick(issue)}>
              {issue.comicId} - {issue.issueId}
            </p>
            <Button variant="outlined" color="error" onClick={() => handleRemove(issue)} size="small">
              Remove
            </Button>
          </React.Fragment>
        ))}
      </div>
    );
  }
}
