import { Dispatch } from "@reduxjs/toolkit";
import { setAlert } from "../redux/alertSlice";
import { toggleAlert } from "../redux/alertSlice";

export const addComicAlert = (dispatch: Dispatch) => {
  dispatch(toggleAlert(false));
  setTimeout(() => {
    dispatch(setAlert({ message: "Added issue", severity: "success", durationInSeconds: 2, visible: true }));
  }, 70);
};
