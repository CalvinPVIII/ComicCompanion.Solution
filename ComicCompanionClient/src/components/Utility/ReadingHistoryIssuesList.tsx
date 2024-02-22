import { List } from "@mui/material";
import { HistoryItem } from "../../redux/readingHistorySlice";
import ReadingHistoryIssue from "./ReadingHistoryIssue";

interface ReadingHistoryIssuesListProps {
  issues: HistoryItem[];
}
export default function ReadingHistoryIssuesList(props: ReadingHistoryIssuesListProps) {
  return (
    <>
      <List component="div" disablePadding>
        {props.issues.map((issue) => (
          <ReadingHistoryIssue issue={issue} key={issue.issue.issueId} />
        ))}
      </List>
    </>
  );
}
