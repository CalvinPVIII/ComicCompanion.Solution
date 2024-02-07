import "../styles/LibraryDashboard.css";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { librarySelector } from "../redux/store";
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
      <Tabs onChange={handleTabChange} value={currentTab}>
        {categoriesArray.map((cat, index) => (
          <Tab label={cat.tagName} value={index + 1} key={index + 1} />
        ))}
      </Tabs>
      <h1>{currentCategory.tagName}</h1>
      <div>
        {currentCategory.comics.map((comic, index) => (
          <div key={index}>{comic.name}</div>
        ))}
      </div>
    </>
  );
}
