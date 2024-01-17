import { Link } from "react-router-dom";
import SearchForm from "../Utility/SearchForm";

import { useSelector } from "react-redux";
import { isCreatingSelector } from "../../redux/store";
export default function ReadingListsPage() {
  const isCreating = useSelector(isCreatingSelector);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Reading Lists</h1>
      <h3 className="link" style={{ textAlign: "center" }}>
        <Link to="/lists/new">{isCreating ? "Edit Current Reading List" : "Create New Reading List"}</Link>
      </h3>
      <SearchForm typeOfSearch="Reading Lists" />
    </>
  );
}
