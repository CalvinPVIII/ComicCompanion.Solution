import { Autocomplete, TextField, List, ListItem, ListItemButton, ListSubheader, Button } from "@mui/material";
import "../../styles/IssuesList.css";
import { SyntheticEvent, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { isCreatingSelector } from "../../redux/store";

interface IssuesListProps {
  issues: string[] | null;
  comicId: string;
}

export default function IssuesList(props: IssuesListProps) {
  const [issueList, setIssueList] = useState<string[] | null | undefined>(props.issues);
  const [inputValue, setInputValue] = useState("");
  const [ascendOrDescend, setAscendOrDescend] = useState<"ascend" | "descend">("descend");

  const isCreating = useSelector(isCreatingSelector);

  const handleFilter = (_e: SyntheticEvent<Element, Event> | null, value: string | null) => {
    if (value) {
      const filteredList = props.issues?.filter((issue) => issue.includes(value));
      console.log(value);
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

  const handleAddToReadingListClick = (issueId: string) => {
    console.log(issueId);
    console.log(props.comicId);
  };

  if (issueList && props.issues) {
    return (
      <div className="issues-container">
        <div className="issues-container-header">
          <Autocomplete
            className="issue-autocomplete"
            disablePortal
            options={props.issues}
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
              {props.issues.length} issues{" "}
              <span id="ascend-descend-button">
                {ascendOrDescend === "ascend" ? <ArrowUpwardIcon onClick={toggleListSorting} /> : <ArrowDownwardIcon onClick={toggleListSorting} />}
              </span>
            </ListSubheader>
            {issueList.map((issue, index) => (
              <>
                <ListItem>
                  <div className="issue-list-items">
                    <ListItemButton>
                      <Link to={`/comics/${props.comicId}/issue/${issue}`} key={index} className="issue-link">
                        {issue}
                      </Link>
                    </ListItemButton>
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
              </>
            ))}
          </List>
        </div>
      </div>
    );
  } else {
    return <p>There are no issues for this comic</p>;
  }
}
