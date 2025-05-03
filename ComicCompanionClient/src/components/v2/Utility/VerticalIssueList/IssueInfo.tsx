import { Link } from "react-router-dom";
import { Chapter } from "../../../../types";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { readingHistorySelector } from "../../../../redux/store";

interface IssueInfoProps {
  generateLink: (chapter: Chapter) => string;
  chapter: Chapter;
  handleIssueClick: () => void;
  isCreating: boolean;
  index: number;
  handleAddToReadingListClick: (chapter: Chapter) => void;
  showListNumbers?: boolean;
  readingListId?: string;
}

export default function IssueInfo(props: IssueInfoProps) {
  const { chapter, generateLink, handleIssueClick, isCreating, index, handleAddToReadingListClick, showListNumbers } = props;

  const readingHistory = useSelector(readingHistorySelector);

  const issueInReadingHistory = readingHistory.comicHistory[props.chapter.comicId]
    ? readingHistory.comicHistory[props.chapter.comicId].issuesRead[props.chapter.id]
    : false;

  const issueInReadingListHistory =
    props.readingListId && readingHistory.readingListHistory[props.readingListId]
      ? readingHistory.readingListHistory[props.readingListId].issuesRead[props.chapter.comicId + props.chapter.id]
      : false;

  const readingHistoryText = () => {
    if (issueInReadingHistory) {
      return <>{issueInReadingHistory.pagesRead}</>;
    } else if (issueInReadingListHistory) {
      return <>{issueInReadingListHistory.pagesRead}</>;
    }
  };

  return (
    <>
      <Link to={generateLink(chapter)} onClick={handleIssueClick}>
        {showListNumbers ? (
          <p>
            <span className="font-bold">#{index + 1}:</span> {chapter.title}
          </p>
        ) : (
          <p>{chapter.title}</p>
        )}
        <p className="text-sm opacity-40">
          {chapter.date}
          {(issueInReadingHistory || issueInReadingListHistory) && <span className="text-sm opacity-60"> - Pages Read: {readingHistoryText()}</span>}
        </p>
      </Link>
      {isCreating && (
        <Button variant="outlined" color="success" onClick={() => handleAddToReadingListClick(chapter)}>
          add to list
        </Button>
      )}
    </>
  );
}
