import { Button, TextField } from "@mui/material";
import "../styles/UserForm.css";
import { useState } from "react";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";

import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

import { useNavigate } from "react-router-dom";

import { UserInfo } from "../types";
import { AuthProps } from "./Utility/UserAuth";
import { getErrorMessage } from "../helpers/helperFunctions";
export default function SignInForm(props: AuthProps) {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigate();

  const resetError = () => {
    setEmailError(false);

    setPasswordError(false);

    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleForm = async () => {
    resetError();
    try {
      if (!email) {
        setEmailError(true);
        setErrorMessage("Email cannot be blank");
        return;
      }

      if (!password) {
        setPasswordError(true);
        setErrorMessage("Password cannot be blank");
        return;
      }

      const result = await ComicCompanionAPIService.signIn(email, password);
      if (result.status === "error") {
        setErrorMessage("there was an error signing in");
      } else if (result.status === "success") {
        const userInfo = result.data as UserInfo;
        dispatch(setUser(userInfo));
        setSuccessMessage("Successfully Signed In");
        if (props.onAuthCallback) {
          props.onAuthCallback();
        } else {
          setTimeout(() => {
            nav("/");
          }, 1000);
        }
      }
    } catch (e) {
      console.error(e);
      const errorMessage = getErrorMessage(e);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <>
      <div className="auth-form">
        <h3>Sign In</h3>
        <TextField label="Email" error={emailError} variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          label="Password"
          error={passwordError}
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage ? <p className="auth-error">{errorMessage}</p> : <></>}
        {successMessage ? <p className="auth-success">{successMessage}</p> : <></>}
        <br />
        <Button variant="contained" color="success" className="auth-form-button" onClick={handleForm}>
          Sign In
        </Button>
      </div>
    </>
  );
}
