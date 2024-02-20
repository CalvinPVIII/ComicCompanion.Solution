import "../styles/ReadingListDashboard.css";
import { Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { librarySelector, createdReadingListsSelector } from "../redux/store";
import ReadingListGrid from "./Utility/ReadingListGrid";

import EmptyLibraryCat from "./Utility/EmptyLibraryCat";

export default function ReadingListDashboard() {
  const library = useSelector(librarySelector);
  const localReadingLists = Object.values(useSelector(createdReadingListsSelector));

  const [currentTab, setCurrentTab] = useState(1);
  const [categories, setCategories] = useState(Object.values(library.readingListCategories));

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    if (localReadingLists.length > 0) {
      const newCats = [...categories, { tagId: "created", tagName: "Created", readingLists: localReadingLists }];
      setCategories(newCats);
    }
  }, []);

  return (
    <>
      <>
        {categories.length <= 0 ? (
          <>
            <EmptyLibraryCat type="readingList" libOrCat="library" />
          </>
        ) : (
          <>
            <Tabs onChange={handleTabChange} value={currentTab} variant="scrollable" scrollButtons="auto">
              {categories.map((cat, index) => (
                <Tab label={cat.tagName} value={index + 1} key={cat.tagId} />
              ))}
            </Tabs>
            <div className="dashboard-content">
              <>
                <ReadingListGrid lists={categories[currentTab - 1].readingLists} />
                {categories[currentTab - 1].readingLists.length === 0 ? <EmptyLibraryCat libOrCat="category" type="readingList" /> : null}
              </>
            </div>
          </>
        )}
      </>
    </>
  );
}
