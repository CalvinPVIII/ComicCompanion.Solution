import { useSelector } from "react-redux";
import { userSelector } from "../../redux/store";
import UserAuth from "../Utility/UserAuth";
import SignOutButton from "../Utility/SignOutButton";
import { TextField, Modal, Button } from "@mui/material";
import { useState } from "react";

import "../../styles/UserSettingsPage.css";

export default function UserSettingsPage() {
  const currentUser = useSelector(userSelector);
  const [userName, setUserName] = useState(currentUser?.userName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {currentUser ? (
        <>
          <Modal open={modalOpen} onClose={closeModal}>
            <div className="confirm-settings-content">
              <h2>Enter your password:</h2>
              <TextField variant="standard" label="Current Password" value={originalPassword} />
              <br />
              <Button color="success" variant="contained">
                Confirm
              </Button>
            </div>
          </Modal>

          <h2>Update User Settings</h2>
          <div className="update-inputs-wrapper">
            <div className="update-inputs">
              <div className="input-fields">
                <TextField variant="standard" label="Email" value={email} />
                <Button color="success" onClick={openModal}>
                  Update Email
                </Button>
              </div>
              <div className="input-fields">
                <TextField variant="standard" label="User Name" value={userName} />
                <Button color="success" onClick={openModal}>
                  Update User Name
                </Button>
              </div>
              <div className="input-fields">
                <TextField variant="standard" label="New Password" value={newPassword} />
                <TextField variant="standard" label="Confirm New Password" value={newPasswordConfirm} />
                <Button color="success" onClick={openModal}>
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
