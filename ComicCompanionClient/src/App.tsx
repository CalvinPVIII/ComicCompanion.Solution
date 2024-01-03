import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./components/pages/HomePage";
import ComicPage from "./components/pages/ComicsPage";
import NavBar from "./components/Navbar";
import ComicInfoPage from "./components/pages/ComicInfoPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/comics" element={<ComicPage />} />
          <Route path="/comics/:comicId" element={<ComicInfoPage />} />
        </Routes>
        <NavBar />
      </ThemeProvider>
    </>
  );
}

export default App;
