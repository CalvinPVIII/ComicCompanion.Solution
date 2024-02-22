import { Link } from "react-router-dom";
import "../../styles/HomePage.css";
import PopularComicsList from "../PopularComicsList";
import PopularReadingListsList from "../PopularReadingListsList";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export default function HomePage() {
  return (
    <>
      <h1 id="homepage-header">Comic Companion</h1>

      <Link to="/comics" className="header-link">
        <h2>POPULAR COMICS</h2>
        <ArrowForwardIcon />
      </Link>
      <PopularComicsList />
      <Link to="/lists" className="header-link">
        <h2>POPULAR READING LISTS</h2>
        <ArrowForwardIcon />
      </Link>
      <PopularReadingListsList />
    </>
  );
}
