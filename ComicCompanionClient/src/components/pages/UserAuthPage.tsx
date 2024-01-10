import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";

import { useSelector } from "react-redux";
import { userSelector } from "../../redux/store";
export default function UserAuthPage() {
  const currentUser = useSelector(userSelector);

  return (
    <>
      <SignInForm />
      <SignUpForm />
      {currentUser ? <h1>{currentUser.email}</h1> : <></>}
    </>
  );
}
