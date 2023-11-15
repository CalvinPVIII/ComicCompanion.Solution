import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IIssue } from "../types";

export default function ComicIssue() {
  const { comicId, issueId } = useParams();
  const [issue, setIssue] = useState<IIssue | null>();

  useEffect(() => {
    const getInfo = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/comics/${comicId}/issues/${issueId}`).then((r) => r.json().then((data) => setIssue(data)));
    };
    getInfo();
  });

  return (
    <>
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
