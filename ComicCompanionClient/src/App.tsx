import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";
import ComicInfo from "./components/ComicInfo";
import ComicIssue from "./components/ComicIssue";
import Header from "./components/Header";
import UserAuthForm from "./components/UserManagement/UserAuthForm";
import UserPage from "./components/UserPage";
import ReadingListPage from "./components/ReadingListPage";
import CreateReadingListPage from "./components/CreateReadingListPage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/comics/:comicId" element={<ComicInfo />} />
        <Route path="/comics/:comicId/issues/:issueId" element={<ComicIssue />} />
        <Route path="/signin" element={<UserAuthForm />} />
        <Route path="/register" element={<UserAuthForm />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/readinglists" element={<ReadingListPage />} />
        <Route path="/readinglists/edit" element={<CreateReadingListPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
