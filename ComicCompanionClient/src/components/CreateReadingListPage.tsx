import SearchBar from "./SearchBar";

export default function CreateReadingListPage() {
  const handleSearch = (thing: string) => {};
  return (
    <>
      <SearchBar searchCallback={handleSearch} />
    </>
  );
}
