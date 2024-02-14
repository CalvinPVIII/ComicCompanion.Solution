import { useSelector } from "react-redux";
import { librarySelector } from "../../redux/store";
export default function LocalReadingListInfoPage() {
  const library = useSelector(librarySelector);
  console.log(library);
  return <>LOCAL</>;
}
