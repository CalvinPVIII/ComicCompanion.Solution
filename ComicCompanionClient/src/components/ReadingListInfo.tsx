import { ReadingList } from "../types";
import { Link } from "react-router-dom";

interface ReadingListInfo {
  readingList: ReadingList;
}

export default function ReadingListInfo(props: ReadingListInfo) {
  const { readingList } = props;
  return (
    <>
      <div>
        <h2>{readingList.name}</h2>
        <h2>{readingList.description}</h2>
        <h2>{readingList.rating}</h2>
      </div>
      <div>
        {readingList.issues.map((issue) => (
          <Link key={`${issue.comicId}-${issue.issueId}`} to={`/comics/${issue.comicId}/issues/${issue.issueId}`} className="comic-info-issue-link">
            {issue.comicId} {issue.issueId}
          </Link>
        ))}
      </div>
    </>
  );
}
