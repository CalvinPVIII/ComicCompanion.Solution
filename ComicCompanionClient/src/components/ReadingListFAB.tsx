import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, CardActions, CardContent, Fab, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { isCreatingSelector, currentListSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "../styles/ReadingListFAB.css";

import IssuesInCreatingReadingList from "./Utility/IssuesInCreatingReadingList";

export default function ReadingListFAB() {
  const isCreating = useSelector(isCreatingSelector);
  const currentList = useSelector(currentListSelector);

  const nav = useNavigate();

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleFinalize = () => {
    nav("/lists/new");
    setMenuVisible(false);
  };

  if (isCreating && currentList) {
    return (
      <>
        <div className="reading-list-fab">
          <Badge badgeContent={currentList.issues.length} color="warning">
            <Fab color="primary" onClick={() => setMenuVisible(!menuVisible)}>
              <Edit />
            </Fab>
          </Badge>
        </div>
        {menuVisible ? (
          <div className="reading-list-fab-menu">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Reading List
              </Typography>
              <h4>{currentList.name}</h4>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ position: "sticky" }}>
                  Issues in List
                </AccordionSummary>

                <AccordionDetails>
                  <IssuesInCreatingReadingList />
                </AccordionDetails>
              </Accordion>
            </CardContent>
            <CardActions>
              <Button size="small" color="success" onClick={handleFinalize}>
                Finalize
              </Button>
            </CardActions>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
