import { Alert, LinearProgress } from "@mui/material";
import "../styles/AppAlert.css";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggleAlert } from "../redux/alertSlice";
import { alertSelector } from "../redux/store";

export default function AppAlert() {
  const dispatch = useDispatch();
  const alertInfo = useSelector(alertSelector);
  const { severity, message, durationInSeconds } = alertInfo;

  const [progress, setProgress] = useState(0);

  const unMountAlert = () => {
    document.getElementById("app-alert")?.classList.add("fade-out");
    setTimeout(() => {
      console.log("dispatch");
      dispatch(toggleAlert(false));
    }, 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (durationInSeconds * 100 <= progress) {
        clearInterval(timer);
        unMountAlert();
      } else {
        setProgress(progress + 10);
      }
    }, 100);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div id="app-alert" onClick={unMountAlert}>
      <Alert severity={severity}>{message} </Alert>
      <LinearProgress variant="determinate" value={progress / durationInSeconds} />
    </div>
  );
}
