import { useSelector } from "react-redux";
import { userSelector } from "../../redux/store";
import UserAuth from "../Utility/UserAuth";
import SignOutButton from "../Utility/SignOutButton";

export default function UserAuthPage() {
  const currentUser = useSelector(userSelector);

  return (
    <>
      <UserAuth />
      {currentUser ? (
        <>
          <h1>{currentUser.email}</h1>
          <SignOutButton />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
