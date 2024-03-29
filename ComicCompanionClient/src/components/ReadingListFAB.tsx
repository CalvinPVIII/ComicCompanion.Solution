import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, CardActions, CardContent, Fab, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { isCreatingSelector, currentListSelector, settingsSelector } from "../redux/store";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toggleModal, setContent } from "../redux/modalSlice";

import { useDispatch } from "react-redux";
import "../styles/ReadingListFAB.css";

import IssuesInCreatingReadingList from "./Utility/IssuesInCreatingReadingList";
import { setCurrentList, toggleCreating } from "../redux/listCreationSlice";
import { useLocation } from "react-router-dom";

export default function ReadingListFAB() {
  const isCreating = useSelector(isCreatingSelector);
  const currentList = useSelector(currentListSelector);
  const settings = useSelector(settingsSelector);
  const location = useLocation();

  const dispatch = useDispatch();

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleFinalize = () => {
    dispatch(setContent({ type: "Finalize Reading List" }));
    dispatch(toggleModal(true));
    setMenuVisible(false);
  };

  const handleCancel = () => {
    dispatch(setCurrentList(null));
    dispatch(toggleCreating(false));
  };

  if (isCreating && currentList && !location.pathname.includes("/lists/new") && !settings.hideEditFAB) {
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
              <Button size="small" color="error" onClick={handleCancel}>
                Cancel
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
