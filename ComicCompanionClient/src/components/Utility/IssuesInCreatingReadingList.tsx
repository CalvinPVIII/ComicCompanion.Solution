import { useSelector, useDispatch } from "react-redux";

import { currentListSelector } from "../../redux/store";
import { removeIssue } from "../../redux/listCreationSlice";
import { Button } from "@mui/material";
import { ReadingListChapter } from "../../types";
import React from "react";

interface IssuesInCreatingReadingListProps {
  onClickCallback?: (issue: ReadingListChapter) => void;
}

export default function IssuesInCreatingReadingList(props: IssuesInCreatingReadingListProps) {
  const issues = useSelector(currentListSelector)?.issues;
  const dispatch = useDispatch();

  const handleRemove = (issue: ReadingListChapter) => {
    dispatch(removeIssue(issue));
  };

  const handleClick = (issue: ReadingListChapter) => {
    if (!props.onClickCallback) return;
    props.onClickCallback(issue);
  };
  if (issues) {
    return (
      <div>
        {issues.map((issue, index) => (
          <React.Fragment key={index}>
            <p onClick={() => handleClick(issue)}>
              {issue.comicTitle} - {issue.title}
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
