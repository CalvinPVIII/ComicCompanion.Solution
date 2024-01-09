import { Link } from "react-router-dom";
import SearchForm from "../Utility/SearchForm";
export default function ReadingListsPage() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Reading Lists</h1>
      <SearchForm typeOfSearch="Reading Lists" />
      <h3 className="link" style={{ textAlign: "center" }}>
        <Link to="/lists/new">Create new reading list</Link>
      </h3>
    </>
  );
}
