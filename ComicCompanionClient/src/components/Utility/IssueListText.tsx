import { Issue } from "../../types";
import { useSelector } from "react-redux";
import { readingHistorySelector } from "../../redux/store";
import "../../styles/IssuesListText.css";

interface IssueListTextProps {
  issue: Issue;
  showComicNames: boolean;
  readingListId?: string | number;
}

export default function IssueListText(props: IssueListTextProps) {
  const readingHistory = useSelector(readingHistorySelector);

  const isIssueInReadingHistory = readingHistory.history[props.issue.comicId]
    ? readingHistory.history[props.issue.comicId][props.issue.issueId]
    : false;

  const isIssueInReadingListHistory = props.readingListId
    ? readingHistory.readingListHistory[props.readingListId].readIssues[props.issue.comicId + props.issue.issueId]
    : false;

  if (isIssueInReadingListHistory) {
    return (
      <span className="read">
        {props.showComicNames ? (
          <>
            {props.issue.comicId} Issue - {props.issue.issueId}
          </>
        ) : (
          <>{props.issue.issueId}</>
        )}
        <br />
        {isIssueInReadingListHistory.completed ? (
          <span className="pages-read-info">Finished</span>
        ) : (
          <span className="pages-read-info">Current Page: {isIssueInReadingListHistory.pagesRead}</span>
        )}
      </span>
    );
  } else if (isIssueInReadingHistory && !props.readingListId) {
    return (
      <span className="read">
        {props.showComicNames ? (
          <>
            {props.issue.comicId} Issue - {props.issue.issueId}
          </>
        ) : (
          <>{props.issue.issueId}</>
        )}
        <br />
        {isIssueInReadingHistory.completed ? (
          <span className="pages-read-info">Finished</span>
        ) : (
          <span className="pages-read-info">Current Page: {isIssueInReadingHistory.pagesRead}</span>
        )}
      </span>
    );
  } else {
    return (
      <span>
        {props.showComicNames ? (
          <>
            {props.issue.comicId} Issue - {props.issue.issueId}
          </>
        ) : (
          <>{props.issue.issueId}</>
        )}
      </span>
    );
  }
}
