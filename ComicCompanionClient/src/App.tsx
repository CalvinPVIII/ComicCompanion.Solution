import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./components/pages/HomePage";
import ComicPage from "./components/pages/ComicsPage";
import NavBar from "./components/Navbar";
import ComicInfoPage from "./components/pages/ComicInfoPage";
import ReadingListsPage from "./components/pages/ReadingListsPage";
import NewReadingListPage from "./components/pages/NewReadingListPage";
import IssuePage from "./components/pages/IssuePage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import GlobalModal from "./components/GlobalModal";
import ReadingListFAB from "./components/ReadingListFAB";
import UserSettingsPage from "./components/pages/UserSettingsPage";
import AppAlert from "./components/AppAlert";

import { useSelector } from "react-redux";
import { alertSelector } from "./redux/store";
import LibraryPage from "./components/pages/LibraryPage";

import LibrarySettingsPage from "./components/pages/LibrarySettingsPage";
import DashboardPage from "./components/pages/DashboardPage";
import SharedReadingListInfoPage from "./components/pages/SharedReadingListInfoPage";
import LocalReadingListInfoPage from "./components/pages/LocalReadingListInfoPage";
import AdvancedSettingsPage from "./components/pages/AdvancedSettingsPage";
import GeneralSettingsPage from "./components/pages/GeneralSettingsPage";
import CreatedReadingLists from "./components/pages/CreatedReadingListsPage";
import ReadingHistoryPage from "./components/pages/ReadingHistoryPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#aa62f9",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: "Mulish",
    h1: {
      fontFamily: "Bangers",
    },
  },
});

function App() {
  const alertInfo = useSelector(alertSelector);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comics" element={<ComicPage />} />
            <Route path="/lists" element={<ReadingListsPage />} />

            <Route path="/account" element={<UserSettingsPage />} />
            <Route path="/library" element={<LibraryPage />} />

            <Route path="/comics/:comicId" element={<ComicInfoPage />} />
            <Route path="/comics/:comicId/issue/:issueId" element={<IssuePage />} />

            <Route path="/lists/new" element={<NewReadingListPage />} />
            <Route path="/lists/shared/:listId" element={<SharedReadingListInfoPage />} />
            <Route path="/lists/local/:listId" element={<LocalReadingListInfoPage />} />
            <Route path="/lists/created" element={<CreatedReadingLists />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings/library" element={<LibrarySettingsPage />} />
            <Route path="/settings/advanced" element={<AdvancedSettingsPage />} />
            <Route path="/settings/general" element={<GeneralSettingsPage />} />
            <Route path="/settings/history" element={<ReadingHistoryPage />} />
          </Routes>
        </div>
        <NavBar />
        <GlobalModal />
        {alertInfo.visible ? <AppAlert /> : <></>}

        <ReadingListFAB />
      </ThemeProvider>
    </>
  );
}

export default App;
