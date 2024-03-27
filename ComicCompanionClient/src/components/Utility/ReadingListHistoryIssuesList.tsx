import { List } from "@mui/material";
import { ReadingListHistoryIssue } from "../../redux/readingHistorySlice";
import ReadingListHistoryIssueItem from "./ReadingListHistoryIssueItem";

interface ReadingListHistoryIssuesListProps {
  issues: ReadingListHistoryIssue[];
  listId: string | number;
}
export default function ReadingListHistoryIssuesList(props: ReadingListHistoryIssuesListProps) {
  return (
    <>
      <List component="div" disablePadding>
        {props.issues.map((issue) => (
          <ReadingListHistoryIssueItem issue={issue} key={issue.issueId} listId={props.listId} />
        ))}
      </List>
    </>
  );
}
