import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";
function App() {
  return (
    <>
      <h1>Comic Companion</h1>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
