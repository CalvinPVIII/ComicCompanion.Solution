import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComic } from "../types";
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
    <>
      {comicInfo ? (
        <>
          <h1>{comicInfo.name}</h1>
          <h3>Issues: {comicInfo.issueIds?.length}</h3>
          <img src={comicInfo.coverImg} />
        </>
      ) : (
        <h1>Comic Info</h1>
      )}
    </>
  );
}
