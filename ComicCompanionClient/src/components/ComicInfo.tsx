import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComic } from "../types";
import { Link } from "react-router-dom";
import "../styles/ComicInfo.css";

export default function ComicInfo() {
  const [comicInfo, setComicInfo] = useState<IComic | null>();
  const { comicId } = useParams();
  useEffect(() => {
    const getInfo = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/comics/${comicId}`).then((r) => r.json().then((data) => setComicInfo(data)));
    };
    getInfo();
  });

  return (
    <div className="comic-info-wrapper">
      {comicInfo ? (
        <div className="comic-info">
          <div className="comic-info-display">
            <h1>{comicInfo.name}</h1>
            <img src={comicInfo.coverImg} />
            <h3>Issues: {comicInfo.issueIds?.length}</h3>
          </div>
          <div className="comic-info-issues">
            {comicInfo.issueIds?.map((issue) => (
              <Link key={`${comicId}-${issue}`} to={`/comics/${comicId}/issues/${issue}`} className="comic-info-issue-link">
                {issue}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <h1>Comic Info</h1>
      )}
    </div>
  );
}
