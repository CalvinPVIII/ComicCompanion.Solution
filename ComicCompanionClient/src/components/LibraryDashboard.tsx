import "../styles/LibraryDashboard.css";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";

export default function LibraryDashboard() {
  const [currentTab, setCurrentTab] = useState(1);
  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };
  return (
    <>
      <Tabs onChange={handleTabChange} value={currentTab}>
        <Tab label="Example category one" value={1} />
        <Tab label="Example category two" value={2} />
      </Tabs>
      {currentTab === 1 ? (
        <>
          <h1>Favorites</h1>
        </>
      ) : currentTab === 2 ? (
        <>
          <h1>Created</h1>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
