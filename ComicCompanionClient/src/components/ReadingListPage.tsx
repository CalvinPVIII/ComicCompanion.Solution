import { useEffect, useState } from "react";
import { userSelector } from "../redux/userReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReadingList } from "../types";
import ReadingListList from "./ReadingListList";

export default function ReadingListPage() {
  const user = useSelector(userSelector);
  const [allReadingLists, setAllReadingLists] = useState<ReadingList[]>([]);

  useEffect(() => {
    const fetchAllReadingLists = () => {
      fetch(`${import.meta.env.VITE_API_URL}/readinglists`)
        .then((r) =>
          r.json().then((data) => {
            console.log(data);
            setAllReadingLists(data);
          })
        )
        .catch((error) => console.log(error));
    };

    fetchAllReadingLists();
  }, []);

  return (
    <>
      <h1>Popular Reading Lists</h1>
      {allReadingLists ? (
        <>
          <ReadingListList list={allReadingLists} />
        </>
      ) : (
        <></>
      )}
      {user ? (
        <>
          <h1>My Reading Lists</h1>{" "}
          <h1>
            <Link to="/readinglists/edit">Create Reading List</Link>
          </h1>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
