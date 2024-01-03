import SearchForm from "../Utility/SearchForm";

export default function ComicPage() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Comic Page</h1>
      <SearchForm typeOfSearch="Comics" />
    </>
  );
}
