import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";
import ComicInfo from "./components/ComicInfo";
import ComicIssue from "./components/ComicIssue";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/comics/:comicId" element={<ComicInfo />} />
        <Route path="/comics/:comicId/issues/:issueId" element={<ComicIssue />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
