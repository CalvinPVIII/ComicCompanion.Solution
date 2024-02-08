import "../styles/ReadingListDashboard.css";
import { Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/store";
import { librarySelector } from "../redux/store";
import ReadingListGrid from "./Utility/ReadingListGrid";
import Loading from "./Utility/Loading";

export default function ReadingListDashboard() {
  const library = useSelector(librarySelector);
  console.log(Object.values(library.readingListCategories));

  const [currentTab, setCurrentTab] = useState(1);
  const [categories, setCategories] = useState(Object.values(library.readingListCategories));
  const [fetchFinished, setFetchFinished] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const currentUser = useSelector(userSelector);

  useEffect(() => {
    if (currentUser) {
      const fetchUserInfo = async () => {
        const newCategories = [...categories];

        if (!newCategories.find((cat) => cat.tagId === "1")) {
          // will need to account for pagination
          const userCreatedResponse = await ComicCompanionAPIService.getReadingListsFromUser(currentUser.userId, currentUser.token, 1);
          if (userCreatedResponse.status === "success") {
            newCategories.unshift({ readingLists: userCreatedResponse.data, tagId: "1", tagName: "Created" });
          }
        }

        if (!newCategories.find((cat) => cat.tagId === "2")) {
          const favoritesResponse = await ComicCompanionAPIService.getFavoriteReadingLists(currentUser.token);
          if (favoritesResponse.status === "success") {
            newCategories.unshift({ readingLists: favoritesResponse.data, tagId: "2", tagName: "Favorites" });
          }
        }

        setCategories(newCategories);
      };

      fetchUserInfo();
    }
    setFetchFinished(true);
  }, []);

  return (
    <>
      {fetchFinished ? (
        <>
          <Tabs onChange={handleTabChange} value={currentTab} variant="scrollable" scrollButtons="auto">
            {categories.map((cat, index) => (
              <Tab label={cat.tagName} value={index + 1} key={cat.tagId} />
            ))}
          </Tabs>
          <div className="dashboard-content">
            <ReadingListGrid lists={categories[currentTab - 1].readingLists} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
