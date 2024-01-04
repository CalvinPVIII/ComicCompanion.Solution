import ReadingListInfo from "../Utility/ReadingListInfo";
import { useParams } from "react-router-dom";

export default function ReadingListInfoPage() {
  const { listId } = useParams();
  return (
    <div className="readinglist-info-page">
      <ReadingListInfo listId={listId as string} />
    </div>
  );
}
