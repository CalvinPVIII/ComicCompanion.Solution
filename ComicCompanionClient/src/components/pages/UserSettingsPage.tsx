import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/store";
import { setUser } from "../../redux/userSlice";
import UserAuth from "../Utility/UserAuth";
import SignOutButton from "../Utility/SignOutButton";
import { TextField, Modal, Button } from "@mui/material";
import { useState } from "react";

import "../../styles/UserSettingsPage.css";
import { UpdateUserData } from "../../types";
import ComicCompanionAPIService from "../../services/ComicCompanionAPIService";

import { successfulUserUpdate } from "../../helpers/alertCreators";

export default function UserSettingsPage() {
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(currentUser?.userName || "");
  const [userNameError, setUserNameError] = useState({ error: false, text: "" });
  const [email, setEmail] = useState(currentUser?.email || "");
  const [emailError, setEmailError] = useState({ error: false, text: "" });
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newPasswordError, setNewPasswordError] = useState({ error: false, text: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState<"email" | "username" | "password" | null>();
  const [updateSuccessText, setUpdateSuccessText] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setFieldToUpdate(null);
  };

  const handleUpdateFieldClick = (field: "email" | "username" | "password") => {
    openModal();
    setFieldToUpdate(field);
  };

  const handleSubmit = async () => {
    if (!currentUser) return;
    setUpdateSuccessText("");

    const updatedUserObj: UpdateUserData = {
      userId: currentUser.userId,
      originalPassword: originalPassword,
      userName: undefined,
      password: undefined,
      email: undefined,
    };
    let errorState = setUserNameError;
    switch (fieldToUpdate) {
      case "email":
        errorState = setEmailError;
        updatedUserObj.email = email;
        break;
      case "username":
        errorState = setUserNameError;
        updatedUserObj.userName = userName;
        break;
      case "password":
        errorState = setNewPasswordError;
        updatedUserObj.password = newPassword;
    }
    const response = await ComicCompanionAPIService.updateUser(currentUser.token, updatedUserObj);
    if (response.status === "error") {
      if (errorState) errorState({ error: true, text: response.data });
    } else if (response.status === "success") {
      const updatedUser = { ...currentUser, userName: userName, email: email };
      dispatch(setUser(updatedUser));
      setUpdateSuccessText(response.data);
      successfulUserUpdate(dispatch);
      closeModal();
    } else {
      console.log(response);
    }
  };

  const validateUserName = () => {
    setUserNameError({ error: false, text: "" });
    if (userName.includes(" ")) {
      setUserNameError({ error: true, text: "User Name cannot contain spaces" });
      return;
    }

    handleUpdateFieldClick("username");
  };

  const validateEmail = () => {
    setEmailError({ error: false, text: "" });
    if (email.includes(" ")) {
      setEmailError({ error: true, text: "User Name cannot contain spaces" });
      return;
    }

    handleUpdateFieldClick("email");
  };

  const handlePasswordValidate = () => {
    setNewPasswordError({ error: false, text: "" });
    if (newPassword !== newPasswordConfirm) {
      setNewPasswordError({ error: true, text: "Passwords do not match" });
      return;
    } else if (newPassword.length === 0 || newPasswordConfirm.length === 0) {
      setNewPasswordError({ error: true, text: "Password cannot be blank" });
      return;
    } else {
      handleUpdateFieldClick("password");
    }
  };

  return (
    <>
      {currentUser ? (
        <>
          <Modal open={modalOpen} onClose={closeModal}>
            <div className="confirm-settings-content">
              <h2>Enter your password:</h2>
              <TextField
                type="password"
                variant="standard"
                label="Current Password"
                value={originalPassword}
                onChange={(e) => setOriginalPassword(e.target.value)}
              />
              <br />
              <Button color="success" variant="contained" onClick={handleSubmit}>
                Confirm
              </Button>
              <p id="update-success-text">{updateSuccessText}</p>
            </div>
          </Modal>

          <h2>Update User Settings</h2>
          <div className="update-inputs-wrapper">
            <div className="update-inputs">
              <div className="input-fields">
                <TextField
                  error={emailError.error}
                  helperText={emailError.text}
                  variant="standard"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button color="primary" onClick={validateEmail}>
                  Update Email
                </Button>
              </div>
              <div className="input-fields">
                <TextField
                  error={userNameError.error}
                  helperText={userNameError.text}
                  variant="standard"
                  label="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Button color="primary" onClick={validateUserName}>
                  Update User Name
                </Button>
              </div>
              <div className="input-fields">
                <TextField
                  error={newPasswordError.error}
                  type="password"
                  variant="standard"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  error={newPasswordError.error}
                  helperText={newPasswordError.text}
                  type="password"
                  variant="standard"
                  label="Confirm New Password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
                <Button color="primary" onClick={handlePasswordValidate}>
                  Change Password
                </Button>
              </div>
            </div>
          </div>
          <br />
          <SignOutButton />
          <br />
        </>
      ) : (
        <>
          <UserAuth />
        </>
      )}
    </>
  );
}
