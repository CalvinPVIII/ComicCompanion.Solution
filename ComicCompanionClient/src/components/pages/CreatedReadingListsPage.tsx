import { useSelector } from "react-redux";
import { createdReadingListsSelector, userSelector } from "../../redux/store";
import ReadingListGrid from "../Utility/ReadingListGrid";
import { useEffect, useState } from "react";
import Loading from "../Utility/Loading";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";
import { ReadingListDto } from "../../types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
export default function CreatedReadingLists() {
  const localLists = useSelector(createdReadingListsSelector);
  const currentUser = useSelector(userSelector);
  const [readingLists, setReadingLists] = useState<ReadingListDto[] | undefined>();
  useEffect(() => {
    const getServerLists = async () => {
      if (currentUser) {
        const response = await ComicCompanionAPIService.getReadingListsFromUser(currentUser.userId, currentUser.token);
        const allLists = Object.values(localLists).concat(response.data);
        setReadingLists(allLists);
      } else {
        setReadingLists(Object.values(localLists));
      }
    };
    getServerLists();
  }, [currentUser, localLists]);
  if (readingLists) {
    return (
      <>
        <div className="settings-header">
          <Link to="/dashboard">
            <ArrowBackIcon />
          </Link>
          <h2>Created Reading Lists</h2>
        </div>
        <ReadingListGrid lists={readingLists} />
      </>
    );
  } else {
    return <Loading />;
  }
}
