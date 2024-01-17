import { Badge, Button, Fab } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { isCreatingSelector, currentListSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
            <p>Reading List:</p>
            <h1>{currentList.name}</h1>

            <Button variant="contained" color="success" onClick={handleFinalize}>
              Finalize
            </Button>

            <IssuesInCreatingReadingList />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
