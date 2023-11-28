import { userSelector } from "../redux/userReducer";
import { useSelector } from "react-redux";
export default function UserPage() {
  const user = useSelector(userSelector);
  console.log(user);
  if (user) {
    return (
      <>
        <h1>Hello user</h1>
      </>
    );
  } else {
    return (
      <>
        <h1>no user</h1>
      </>
    );
  }
}
