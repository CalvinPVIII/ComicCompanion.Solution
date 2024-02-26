import { Button, TextField } from "@mui/material";
import "../styles/UserForm.css";
import { useState } from "react";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";

import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

import { UserInfo } from "../types";
import { useNavigate } from "react-router-dom";
import { AuthProps } from "./Utility/UserAuth";
import { getErrorMessage } from "../helpers/helperFunctions";
export default function SignUpForm(props: AuthProps) {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();

  const nav = useNavigate();

  const resetError = () => {
    setEmailError(false);
    setPasswordConfirmError(false);
    setPasswordError(false);
    setUserNameError(false);
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
      if (!userName) {
        setUserNameError(true);
        setErrorMessage("User Name cannot be blank");
        return;
      }
      if (!password) {
        setPasswordError(true);
        setErrorMessage("Password cannot be blank");
        return;
      }
      if (!passwordConfirm) {
        setPasswordConfirmError(true);
        setErrorMessage("Password Confirmation cannot be blank");
        return;
      }
      if (password !== passwordConfirm) {
        setPasswordConfirmError(true);
        setErrorMessage("Password Confirmation does not match");
        return;
      }

      const result = await ComicCompanionAPIService.signUp(email, userName, password);
      if (result.status === "error") {
        setErrorMessage("there was an error creating your account");
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
        <h3>Create Account</h3>
        <TextField label="Email" error={emailError} variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="User Name" error={userNameError} variant="standard" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <TextField
          label="Password"
          error={passwordError}
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          error={passwordConfirmError}
          variant="standard"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {errorMessage ? <p className="auth-error">{errorMessage}</p> : <></>}
        {successMessage ? <p className="auth-success">{successMessage}</p> : <></>}
        <br />
        <Button variant="contained" color="success" className="auth-form-button" onClick={handleForm}>
          Create Account
        </Button>
      </div>
    </>
  );
}
