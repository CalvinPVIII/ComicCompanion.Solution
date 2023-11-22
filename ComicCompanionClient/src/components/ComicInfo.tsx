import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComic } from "../types";
import { Link } from "react-router-dom";
import "../styles/ComicInfo.css";

interface ComicInfoProps {
  comicId?: string;
}

export default function ComicInfo(props: ComicInfoProps) {
  const [comicInfo, setComicInfo] = useState<IComic | null>();
  const { comicId } = useParams();
  useEffect(() => {
    const comicSearchId = props.comicId ? props.comicId : comicId;
    const getInfo = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/comics/${comicSearchId}`).then((r) => r.json().then((data) => setComicInfo(data)));
    };
    getInfo();
  });

  return (
    <div className="comic-info-wrapper">
      {comicInfo ? (
        <div className="comic-info">
          <div className="comic-info-display">
            <h1 id="comic-info-header">{comicInfo.name}</h1>
            <h3>Number of Issues: {comicInfo.issueIds?.length}</h3>
          </div>
          <img src={comicInfo.coverImg} />
          <div>
            <div className="comic-info-issues">
              {comicInfo.issueIds?.map((issue) => (
                <Link
                  key={`${comicId}-${issue}`}
                  to={`/comics/${props.comicId ? props.comicId : comicId}/issues/${issue}`}
                  className="comic-info-issue-link"
                >
                  Issue: {issue}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1>Comic Info</h1>
      )}
    </div>
  );
}
