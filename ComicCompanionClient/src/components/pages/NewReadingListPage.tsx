import ReadingListForm from "../Utility/ReadingListForm";
import SearchForm from "../Utility/SearchForm";
export default function NewReadingListPage() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create a New Reading List</h1>
      <ReadingListForm />
      <br />
      <h3> Add Comics</h3>
      <SearchForm typeOfSearch="Comics" />
    </>
  );
}
