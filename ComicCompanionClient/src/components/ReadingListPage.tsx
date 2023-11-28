import { userSelector } from "../redux/userReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ReadingListPage() {
  const user = useSelector(userSelector);
  return (
    <>
      <h1>Browse Reading Lists</h1>
      {user ? (
        <>
          <h1>My Reading Lists</h1>{" "}
          <h1>
            <Link to="/readinglists/new">Create Reading List</Link>
          </h1>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
