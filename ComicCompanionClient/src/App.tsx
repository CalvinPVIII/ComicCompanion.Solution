import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./components/pages/HomePage";
import ComicPage from "./components/pages/ComicsPage";
import NavBar from "./components/Navbar";
import ComicInfoPage from "./components/pages/ComicInfoPage";
import ReadingListsPage from "./components/pages/ReadingListsPage";
import ReadingListInfoPage from "./components/pages/ReadingListInfoPage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IssuePage from "./components/pages/IssuePage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#aa62f9",
    },
    secondary: {
      main: "#ff8200",
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
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comics" element={<ComicPage />} />
            <Route path="/lists" element={<ReadingListsPage />} />

            <Route path="/comics/:comicId" element={<ComicInfoPage />} />
            <Route path="/comics/:comicId/issue/:issueId" element={<IssuePage />} />

            <Route path="/lists/:listId" element={<ReadingListInfoPage />} />
          </Routes>
        </div>
        <NavBar />
      </ThemeProvider>
    </>
  );
}

export default App;
