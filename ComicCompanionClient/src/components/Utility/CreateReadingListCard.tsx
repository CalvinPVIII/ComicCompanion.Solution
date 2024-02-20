import "../../styles/CreateReadingListCard.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
interface CreateReadingListCardProps {
  variant?: "outlined" | "contained" | "text";
  isEditing?: boolean;
}
export default function CreateReadingListCard(props: CreateReadingListCardProps) {
  return (
    <Link to="/lists/new" id="create-list-button">
      <Button color="success" variant={props.variant || "outlined"}>
        {props.isEditing ? "Edit Reading List" : "Create Reading List"}
      </Button>
    </Link>
  );
}
