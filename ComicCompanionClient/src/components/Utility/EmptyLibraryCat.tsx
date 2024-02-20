import { Link } from "react-router-dom";
import "../../styles/EmptyLibraryCat.css";
interface EmptyLibraryCatProps {
  type: "readingList" | "comic";
  libOrCat: "library" | "category";
}
export default function EmptyLibraryCat(props: EmptyLibraryCatProps) {
  return (
    <div className="library-empty">
      <h3 id="empty-header">{props.libOrCat} Is Empty</h3>

      {props.type === "readingList" ? (
        <>
          <h4>
            <Link to="/lists/new" className="link">
              Create New Reading List
            </Link>
          </h4>

          <h4>
            <Link to="/lists">Browse Reading Lists</Link>
          </h4>
        </>
      ) : (
        <h4>
          <Link to="/comics">Browse Comics</Link>
        </h4>
      )}
    </div>
  );
}
