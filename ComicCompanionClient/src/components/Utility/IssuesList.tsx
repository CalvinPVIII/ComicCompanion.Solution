import { Autocomplete, TextField, List, ListItem, ListItemButton, ListSubheader, Button } from "@mui/material";
import "../../styles/IssuesList.css";
import { SyntheticEvent, useRef, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link, useLocation } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import { isCreatingSelector } from "../../redux/store";
import { addIssue, bulkAddIssue } from "../../redux/listCreationSlice";
import { setPlaylist, setPreviousPage } from "../../redux/readingHistorySlice";
import { Issue, ReadingListDto } from "../../types";
import { addComicAlert } from "../../helpers/alertCreators";
import { createReadingListHistoryItem, bulkAddIssuesToHistory, bulkAddIssuesToReadingListHistory } from "../../redux/readingHistorySlice";
import React from "react";
import IssueListText from "./IssueListText";
import BulkSelectIssuesMenu from "./BulkSelectIssuesMenu";
import { Refresh } from "@mui/icons-material";

interface IssuesListProps {
  issues: null | Issue[];
  showComicNames: boolean;
  readingList?: ReadingListDto;
  refreshList?: () => void;
}

export default function IssuesList(props: IssuesListProps) {
  const [issueList, setIssueList] = useState<Issue[] | null | undefined>(props.issues);
  const [inputValue, setInputValue] = useState("");
  const [ascendOrDescend, setAscendOrDescend] = useState<"ascend" | "descend">("descend");

  const [isBulkSelecting, setIsBulkSelecting] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);
  const mouseDownTimeStamp = useRef(0);
  const dispatch = useDispatch();
  const location = useLocation();

  const isCreating = useSelector(isCreatingSelector);

  const handleFilter = (_e: SyntheticEvent<Element, Event> | null, value: string | null) => {
    if (value) {
      const filteredList = props.issues?.filter((issue) => `${issue.comicId} Issue - ${issue.issueId}`.includes(value));
      setIssueList(filteredList);
      setInputValue(value);
    } else {
      if (ascendOrDescend === "ascend") {
        setIssueList(props.issues?.reverse());
      } else {
        setIssueList(props.issues);
      }
      setInputValue("");
    }
  };

  const toggleListSorting = () => {
    if (!issueList) return;
    if (ascendOrDescend === "ascend") {
      setAscendOrDescend("descend");
    } else if (ascendOrDescend === "descend") {
      setAscendOrDescend("ascend");
    }
    const flippedList = [...issueList].reverse();
    setIssueList(flippedList);
  };

  const handleAddToReadingListClick = (issue: Issue) => {
    const issueToAdd: Issue = {
      issueId: issue.issueId,
      comicId: issue.comicId,
      pages: null,
      readingListIssueId: uuidv4(),
    };
    dispatch(addIssue(issueToAdd));
    addComicAlert(dispatch);
  };

  const addReadingListToHistory = () => {
    if (props.readingList) {
      dispatch(
        createReadingListHistoryItem({
          name: props.readingList.name,
          listId: props.readingList.readingListId,
          coverImg: props.readingList.coverImg || "",
          readIssues: {},
        })
      );
    }
  };

  const handleSetPlaylist = () => {
    if (props.issues) {
      if (ascendOrDescend === "ascend" || props.readingList) {
        dispatch(setPlaylist(props.issues));
      } else {
        dispatch(setPlaylist(props.issues.reverse()));
      }
      dispatch(setPreviousPage(location.pathname));
    }
  };

  const handleMouseDown = () => {
    const mouseDown = Date.now();
    mouseDownTimeStamp.current = mouseDown;
  };

  const handleMouseUp = () => {
    const mouseUpTime = Date.now();
    mouseUpTime - mouseDownTimeStamp.current > 500 ? setIsBulkSelecting(true) : null;
  };

  const handleIssueSelect = (issue: Issue) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter((i) => i !== issue));
    } else {
      setSelectedIssues(selectedIssues.concat([issue]));
    }
  };

  const handleAddSelectedToReadingList = () => {
    if (isCreating) {
      const issuesToAdd = selectedIssues.map((issue) => ({
        ...issue,
        readingListIssueId: uuidv4(),
      }));
      dispatch(bulkAddIssue(issuesToAdd));
      addComicAlert(dispatch);
    }
  };

  const closeSelectIssueMenu = () => setIsBulkSelecting(false);

  const handleSelectAllIssuesButton = () => {
    if (issueList && selectedIssues.length < issueList.length) {
      setSelectedIssues(issueList);
    } else {
      setSelectedIssues([]);
    }
  };

  const handleMarkAllAsRead = () => {
    if (props.readingList) {
      dispatch(bulkAddIssuesToReadingListHistory({ issues: selectedIssues, readingList: props.readingList }));
    } else {
      dispatch(bulkAddIssuesToHistory({ issues: selectedIssues, comicId: selectedIssues[0].comicId, coverImg: "" }));
    }
  };

  const issueAutoComplete = props.showComicNames
    ? props.issues?.map((issue) => `${issue.comicId} Issue - ${issue.issueId}`)
    : props.issues?.map((issue) => issue.issueId);

  if (issueList && props.issues) {
    return (
      <div className="issues-container">
        <div className="issues-container-header">
          <Autocomplete
            className="issue-autocomplete"
            disablePortal
            options={issueAutoComplete ? issueAutoComplete : [""]}
            onChange={handleFilter}
            value={inputValue}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="Search For Issue" value={inputValue} onChange={(e) => handleFilter(null, e.target.value)} />
            )}
          />
        </div>
        <div className="issues-container-body">
          <List className="issues-list">
            <ListSubheader>
              <span id="issues-list-header">
                {props.refreshList && <Refresh onClick={props.refreshList} />}
                {props.issues.length} issues
                {ascendOrDescend === "ascend" ? <ArrowUpwardIcon onClick={toggleListSorting} /> : <ArrowDownwardIcon onClick={toggleListSorting} />}
              </span>
            </ListSubheader>

            {issueList.map((issue, index) => (
              <React.Fragment key={index}>
                <ListItem onClick={handleSetPlaylist}>
                  <div className="issue-list-items">
                    {isBulkSelecting ? (
                      <ListItemButton selected={selectedIssues.includes(issue)} onClick={() => handleIssueSelect(issue)}>
                        <IssueListText issue={issue} showComicNames={props.showComicNames} readingListId={props.readingList?.readingListId} />
                      </ListItemButton>
                    ) : (
                      <ListItemButton>
                        <Link
                          onPointerDown={handleMouseDown}
                          onPointerUp={handleMouseUp}
                          to={
                            props.readingList
                              ? `/lists/${props.readingList.readingListId}/comics/${issue.comicId}/issue/${issue.issueId}`
                              : `/comics/${issue.comicId}/issue/${issue.issueId}`
                          }
                          onClick={addReadingListToHistory}
                          className="issue-link"
                        >
                          <IssueListText issue={issue} showComicNames={props.showComicNames} readingListId={props.readingList?.readingListId} />
                        </Link>
                      </ListItemButton>
                    )}

                    {isCreating ? (
                      <>
                        <Button variant="outlined" color="success" onClick={() => handleAddToReadingListClick(issue)}>
                          add to list
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>
        {isBulkSelecting ? (
          <BulkSelectIssuesMenu
            handleStopSelecting={closeSelectIssueMenu}
            handleSelectAllIssues={handleSelectAllIssuesButton}
            handleMarkAllAsRead={handleMarkAllAsRead}
            handleBulkAddToReadingList={isCreating ? handleAddSelectedToReadingList : undefined}
          />
        ) : null}
      </div>
    );
  } else {
    return <p>There are no issues for this comic</p>;
  }
}
