import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { Button } from "@mui/material";

export default function SignOutButton() {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(setUser(null));
  };

  return (
    <>
      <Button color="error" variant="outlined" onClick={signOut}>
        Sign Out
      </Button>
    </>
  );
}
