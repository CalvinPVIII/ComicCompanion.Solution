import "../styles/LibraryDashboard.css";
import "../styles/ReadingListDashboard.css";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { librarySelector } from "../redux/store";
import ComicsGrid from "./Utility/ComicsGrid";
export default function LibraryDashboard() {
  const library = useSelector(librarySelector);
  const categoriesArray = Object.values(library.libraryCategories);
  const [currentTab, setCurrentTab] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(categoriesArray[0]);
  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
    setCurrentCategory(categoriesArray[value - 1]);
  };
  return (
    <>
      <Tabs onChange={handleTabChange} value={currentTab} variant="scrollable" scrollButtons="auto">
        {categoriesArray.map((cat, index) => (
          <Tab label={cat.tagName} value={index + 1} key={index + 1} />
        ))}
      </Tabs>
      <div>
        <div className="dashboard-content">
          <ComicsGrid comics={currentCategory.comics} />
        </div>
      </div>
    </>
  );
}
