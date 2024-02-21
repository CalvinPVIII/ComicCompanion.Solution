import { Tabs, Tab } from "@mui/material";
import ReadingListDashboard from "../ReadingListDashboard";
import LibraryDashboard from "../LibraryDashboard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { settingsSelector } from "../../redux/store";

export default function LibraryPage() {
  const settings = useSelector(settingsSelector);
  const [currentTab, setCurrentTab] = useState<number>(settings.defaultLibraryPage === "comics" ? 1 : 2);
  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tabs onChange={handleTabChange} value={currentTab} textColor="secondary" indicatorColor="secondary">
          <Tab label="Library" value={1} />
          <Tab label="Reading Lists" value={2} />
        </Tabs>
      </div>
      {currentTab === 1 ? <LibraryDashboard /> : currentTab === 2 ? <ReadingListDashboard /> : <></>}
    </>
  );
}
