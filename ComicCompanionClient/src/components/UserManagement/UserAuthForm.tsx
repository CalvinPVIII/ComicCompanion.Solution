import "../../styles/UserAuthForm.css";
import { useState } from "react";

import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { setUser } from "../../redux/userReducer";
import { useDispatch } from "react-redux";

interface UserAuthFormProps {
  closeModal?: () => void;
}

export default function UserAuthForm(props: UserAuthFormProps) {
  const [signInEmail, setSignIEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signInMessage, setSignInMessage] = useState("");
  const [signInMessageColor, setSignInMessageColor] = useState("limegreen");

  const dispatch = useDispatch();

  const clearAuthMessages = () => {
    setSignInMessage("");
    setSignInMessageColor("green");
  };

  const onSignIn = (userEmail = signInEmail, userPassword = signInPassword, message: string | undefined) => {
    clearAuthMessages();
    fetch(`${import.meta.env.VITE_API_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    })
      .then((response) =>
        response.json().then((data) => {
          if (data.status === "success" && message) {
            console.log(data);
            dispatch(setUser({ email: userEmail, userName: data.userName, token: data.token, userId: data.userId }));
            setSignInMessage(message);
            if (props.closeModal) props.closeModal();
          } else {
            setSignInMessage(`There was an issue signing in. Please check your email and password`);
            setSignInMessageColor("red");
          }
        })
      )
      .catch((error) => {
        setSignInMessage(`Unable to sign in: ${error.message}`);
        setSignInMessageColor("red");
      });
  };

  const onRegister = () => {
    clearAuthMessages();
    if (signUpPassword !== passwordConfirm) {
      setSignInMessage("Passwords do not match");
      setSignInMessageColor("red");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: signUpEmail, userName: signUpUserName, password: signUpPassword }),
    }).then((response) =>
      response.json().then((data) => {
        if (data.status === "success") {
          onSignIn(signUpEmail, signUpPassword, data.message);
        }
      })
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          margin: "auto",
          maxWidth: "800px",
          justifyContent: "space-evenly",
        }}
      >
        <div className="signIn" style={{ paddingRight: "20px" }}>
          <h2 style={{ fontWeight: "700" }}>Sign In</h2>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input onChange={(e) => setSignIEmail(e.target.value)} type="text" placeholder="Enter Email" />
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter Password" onChange={(e) => setSignInPassword(e.target.value)} />
          </FormControl>
          <br />
          <Button onClick={() => onSignIn(signInEmail, signInPassword, "User successfully signed in")}>Sign In</Button>
        </div>
        <div className="signUp">
          <h2 style={{ fontWeight: "700" }}>Sign Up</h2>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input onChange={(e) => setSignUpEmail(e.target.value)} type="text" placeholder="Enter Email" />
            <FormLabel>Username</FormLabel>
            <Input onChange={(e) => setSignUpUserName(e.target.value)} type="text" placeholder="Enter Username" />
            <FormLabel>Password</FormLabel>
            <Input onChange={(e) => setSignUpPassword(e.target.value)} type="password" placeholder="Enter Password" />
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" placeholder="Enter Password" onChange={(e) => setPasswordConfirm(e.target.value)} />
          </FormControl>
          <br />
          <Button onClick={onRegister}>Register</Button>
        </div>
      </div>
      <p style={{ color: signInMessageColor, textAlign: "center" }}>{signInMessage}</p>
    </>
  );
}
