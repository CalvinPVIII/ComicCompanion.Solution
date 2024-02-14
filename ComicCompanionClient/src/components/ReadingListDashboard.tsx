import "../styles/ReadingListDashboard.css";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";

import { useSelector } from "react-redux";

import { librarySelector } from "../redux/store";
import ReadingListGrid from "./Utility/ReadingListGrid";

import { Link } from "react-router-dom";

export default function ReadingListDashboard() {
  const library = useSelector(librarySelector);

  const [currentTab, setCurrentTab] = useState(1);
  const categories = Object.values(library.readingListCategories);

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  // const currentUser = useSelector(userSelector);

  // useEffect(() => {
  //   if (currentUser) {
  //     const fetchUserInfo = async () => {
  //       const newCategories = [...categories];

  //       const userCreatedResponse = await ComicCompanionAPIService.getReadingListsFromUser(currentUser.userId, currentUser.token, 1);
  //       if (userCreatedResponse.status === "success") {
  //         newCategories.unshift({ readingLists: userCreatedResponse.data, tagId: "1", tagName: "Created" });
  //       }
  //       setCategories(newCategories);
  //     };

  //     fetchUserInfo();
  //   }
  //   setFetchFinished(true);
  // }, []);

  return (
    <>
      <>
        {categories.length <= 0 ? (
          <>
            <div className="library-empty">
              <h3>Reading List Library Is Empty</h3>

              <h4>
                <Link to="/lists/new" className="link">
                  Create New Reading List
                </Link>
              </h4>

              <h4>
                <Link to="/lists">Browse Reading Lists</Link>
              </h4>
            </div>
          </>
        ) : (
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
        )}
      </>
    </>
  );
}
