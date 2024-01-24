import "../styles/ReadingListDashboard.css";
import { Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { ReadingListDto } from "../types";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/store";
import ReadingListGrid from "./Utility/ReadingListGrid";

export default function ReadingListDashboard() {
  const [currentTab, setCurrentTab] = useState(1);
  const [userReadingLists, setUserReadingLists] = useState<ReadingListDto[] | null>(null);
  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const currentUser = useSelector(userSelector);

  useEffect(() => {
    // will need to account for pagination
    if (!currentUser) return;
    const getUserLists = async () => {
      const response = await ComicCompanionAPIService.getReadingListsFromUser(currentUser.userId, currentUser.token, 1);
      if (response.status === "success") {
        setUserReadingLists(response.data);
      }
    };
    getUserLists();
  }, [currentUser]);
  console.log(userReadingLists);
  console.log(currentUser?.userId);

  return (
    <>
      <Tabs onChange={handleTabChange} value={currentTab}>
        <Tab label="Favorites" value={1} />
        <Tab label="Created" value={2} />
      </Tabs>
      {currentTab === 1 ? (
        <>
          <h1>Favorites</h1>
        </>
      ) : currentTab === 2 ? (
        <>
          {userReadingLists ? (
            <>
              <ReadingListGrid lists={userReadingLists} />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
