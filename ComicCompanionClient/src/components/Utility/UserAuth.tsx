import { useState } from "react";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";
import "../../styles/UserAuth.css";

export interface AuthProps {
  onAuthCallback?: () => void;
}

export default function UserAuth(props: AuthProps) {
  const [currentForm, setCurrentForm] = useState<"SignIn" | "SignUp">("SignIn");

  const toggleForm = () => {
    if (currentForm === "SignIn") {
      setCurrentForm("SignUp");
    } else {
      setCurrentForm("SignIn");
    }
  };

  if (currentForm === "SignIn") {
    return (
      <div id="user-auth">
        <SignInForm onAuthCallback={props.onAuthCallback} />
        <p id="auth-form-toggle" onClick={toggleForm}>
          Create an account
        </p>
      </div>
    );
  } else {
    return (
      <div id="user-auth">
        <SignUpForm onAuthCallback={props.onAuthCallback} />
        <p id="auth-form-toggle" onClick={toggleForm}>
          Already have an account?
        </p>
      </div>
    );
  }
}
