import { useParams } from "react-router-dom";
import ComicInfo from "../Utility/ComicInfo";
import "../../styles/ComicInfoPage.css";

export default function ComicInfoPage() {
  const { comicId } = useParams();

  return (
    <div className="comic-info-page">
      <ComicInfo comicId={comicId as string} />
    </div>
  );
}
