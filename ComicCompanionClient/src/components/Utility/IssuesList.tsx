import { Autocomplete, TextField, List, ListItem, ListItemButton, ListSubheader } from "@mui/material";
import "../../styles/IssuesList.css";
import { SyntheticEvent, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "react-router-dom";
interface IssuesListProps {
  issues: string[] | null;
  comicId: string;
}

export default function IssuesList(props: IssuesListProps) {
  const [issueList, setIssueList] = useState<string[] | null | undefined>(props.issues);
  const [inputValue, setInputValue] = useState("");
  const [ascendOrDescend, setAscendOrDescend] = useState<"ascend" | "descend">("descend");

  const handleFilter = (e: SyntheticEvent<Element, Event> | null, value: string | null) => {
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
          <span id="ascend-descend-button">
            {ascendOrDescend === "ascend" ? <ArrowUpwardIcon onClick={toggleListSorting} /> : <ArrowDownwardIcon onClick={toggleListSorting} />}
          </span>
        </div>
        <div className="issues-container-body">
          <List className="issues-list">
            <ListSubheader>{props.issues.length} issues</ListSubheader>
            {issueList.map((issue, index) => (
              <ListItem>
                <ListItemButton>
                  <Link to={`/comics/${props.comicId}/issue/${issue}`} key={index}>
                    {issue}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  } else {
    return <p>There are no issues for this comic</p>;
  }
}
