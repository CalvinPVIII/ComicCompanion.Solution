import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";
// import { userSelector } from "../../redux/store";
export default function SignOutButton() {
  const dispatch = useDispatch();
  //   const currentUser = useSelector(userSelector);

  const signOut = () => {
    dispatch(setUser(null));
  };

  return (
    <>
      <h3 onClick={signOut}>Sign Out</h3>
    </>
  );
}
