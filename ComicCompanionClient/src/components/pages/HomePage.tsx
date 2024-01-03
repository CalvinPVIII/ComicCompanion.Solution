import "../../styles/HomePage.css";
import PopularComicsList from "../PopularComicsList";

export default function HomePage() {
  return (
    <>
      <h1 id="homepage-header">Comic Companion</h1>
      <h2 id="img-slideshow">Placeholder for image slideshow</h2>
      <h2>Popular Comics</h2>
      <PopularComicsList />
      <h2>Popular Reading Lists</h2>
      <h2>placeholder for popular reading lists</h2>
    </>
  );
}
