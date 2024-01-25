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
  const [favoriteReadingLists, setFavoriteReadingLists] = useState<ReadingListDto[] | null>(null);

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

  useEffect(() => {
    if (!currentUser) return;
    const getFavoriteLists = async () => {
      const response = await ComicCompanionAPIService.getFavoriteReadingLists(currentUser.token);
      console.log(response);
      if (response.status === "success") {
        setFavoriteReadingLists(response.data);
      }
    };
    getFavoriteLists();
  }, [currentUser]);

  return (
    <>
      <Tabs onChange={handleTabChange} value={currentTab}>
        <Tab label="Favorites" value={1} />
        <Tab label="Created" value={2} />
      </Tabs>
      {currentTab === 1 ? (
        <>
          {favoriteReadingLists ? (
            <>
              <ReadingListGrid lists={favoriteReadingLists} />
            </>
          ) : (
            <></>
          )}
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
