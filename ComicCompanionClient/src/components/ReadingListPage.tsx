import { useEffect, useState } from "react";
import { userSelector } from "../redux/userReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReadingList } from "../types";
import ReadingListList from "./ReadingListList";

export default function ReadingListPage() {
  const user = useSelector(userSelector);
  const [allReadingLists, setAllReadingLists] = useState<ReadingList[]>([]);
  const [userReadingLists, setUserReadingLists] = useState<ReadingList[]>([]);

  useEffect(() => {
    const fetchAllReadingLists = () => {
      fetch(`${import.meta.env.VITE_API_URL}/readinglists`)
        .then((r) =>
          r.json().then((data) => {
            setAllReadingLists(data);
          })
        )
        .catch((error) => console.log(error));
    };

    fetchAllReadingLists();
  }, [user]);

  useEffect(() => {
    const fetchUserReadingLists = () => {
      if (!user) return;
      fetch(`${import.meta.env.VITE_API_URL}/readinglists?userId=${user.userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((r) =>
          r.json().then((data) => {
            setUserReadingLists(data);
          })
        )
        .catch((error) => console.log(error));
    };

    fetchUserReadingLists();
  }, [user]);

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
          <h1>My Reading Lists</h1>
          <ReadingListList list={userReadingLists} />
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
