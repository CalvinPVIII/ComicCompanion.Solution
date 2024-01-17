import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import IssuesInCreatingReadingList from "../Utility/IssuesInCreatingReadingList";
import ReadingListForm from "../Utility/ReadingListForm";
import SearchForm from "../Utility/SearchForm";
import "../../styles/NewReadingListPage.css";

export default function NewReadingListPage() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Customize Reading List</h1>
      <ReadingListForm />
      <br />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ position: "sticky" }}>
          Issues in List
        </AccordionSummary>
        <AccordionDetails>
          <IssuesInCreatingReadingList />
        </AccordionDetails>
      </Accordion>
      <h3> Add Comics</h3>
      <SearchForm typeOfSearch="Comics" openInModal={true} />
    </>
  );
}
