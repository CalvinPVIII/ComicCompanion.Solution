import { useSelector } from "react-redux";
import { userSelector } from "../../redux/store";
import UserAuth from "../Utility/UserAuth";
import SignOutButton from "../Utility/SignOutButton";

export default function UserAuthPage() {
  const currentUser = useSelector(userSelector);

  return (
    <>
      {currentUser ? (
        <>
          <h2> Current User: {currentUser.email}</h2>
          <SignOutButton />
        </>
      ) : (
        <>
          <UserAuth />
        </>
      )}
    </>
  );
}
