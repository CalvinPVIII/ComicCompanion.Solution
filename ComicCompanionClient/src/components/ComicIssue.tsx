import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IIssue } from "../types";

import { useSelector, useDispatch } from "react-redux";
import { creatingReadingListSelector, currentEditingReadingListSelector } from "../redux/readingListReducer";

import ReadingListHelper from "../helpers/ReadingListHelper";

import "../styles/ComicIssue.css";

export default function ComicIssue() {
  const { comicId, issueId } = useParams();
  const [issue, setIssue] = useState<IIssue | null>();

  const isEditing = useSelector(creatingReadingListSelector);
  const currentEditingReadingList = useSelector(currentEditingReadingListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const getInfo = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/comics/${comicId}/issues/${issueId}`).then((r) => r.json().then((data) => setIssue(data)));
    };
    getInfo();
  });

  const handleAddingToReadingList = (issue: IIssue) => {
    if (!currentEditingReadingList) return;
    ReadingListHelper.addIssueToList(issue, currentEditingReadingList, dispatch);
  };

  return (
    <>
      {isEditing && issue ? (
        <>
          <p id="add-to-reading-list" onClick={() => handleAddingToReadingList(issue)}>
            Add to reading list
          </p>
        </>
      ) : (
        <></>
      )}
      <h1>Comic</h1>
      {issue ? (
        <>
          {issue.pages?.map((page, i) => (
            <img key={i} src={page} alt={`page ${i}`} />
          ))}
        </>
      ) : (
        <>Error loading issue</>
      )}
    </>
  );
}
