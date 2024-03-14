import { useSelector, useDispatch } from "react-redux";
import { addToSeenVersions, toggleSeenPatchNotes } from "../redux/appInfoSlice";
import { appInfoSelector } from "../redux/store";
import { useEffect, useState } from "react";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import { Button, Checkbox, Modal } from "@mui/material";
import { Capacitor } from "@capacitor/core";
import { APP_VERSION } from "../helpers/constants";
import "../styles/UpdateChecker.css";

type AppInfoData = { version: string; downloadLink: string; patchNotes: string[] };

export default function UpdateChecker() {
  const appInfo = useSelector(appInfoSelector);
  const dispatch = useDispatch();
  const [appInfoData, setAppInfoData] = useState<AppInfoData | null>();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // check for update
  useEffect(() => {
    const getData = async () => {
      const response = await ComicCompanionAPIService.getAppInfo();
      setAppInfoData(response.data);
      if (response.data.version !== APP_VERSION) {
        if (!appInfo.dontShowUpdatesFor.includes(response.data.version)) {
          handleOpen();
          setUpdateAvailable(true);
        }
      } else {
        if (!appInfo.seenPatchNotesFor.includes(APP_VERSION)) {
          handleOpen();
          dispatch(toggleSeenPatchNotes(APP_VERSION));
        }
      }
    };
    getData();
  }, []);

  const handleDontShowAgain = () => {
    if (!appInfoData) return;
    dispatch(addToSeenVersions(appInfoData.version));
  };

  if (Capacitor.getPlatform() !== "web")
    return (
      <>
        <Modal open={open} onClose={handleClose}>
          {appInfoData ? (
            <>
              <div className="app-info-modal">
                {updateAvailable ? (
                  <>
                    <h1>An Update is Available!</h1>
                    <Button variant="contained">
                      <a href={appInfoData.downloadLink}>Download</a>
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                <h2 className="patch-notes-header">What's New:</h2>
                <ul className="patch-notes">
                  {appInfoData.patchNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
                {updateAvailable ? (
                  <label>
                    <Checkbox checked={appInfo.dontShowUpdatesFor.includes(appInfoData.version)} onChange={handleDontShowAgain} />
                    Don't show again
                  </label>
                ) : null}
              </div>
            </>
          ) : (
            <></>
          )}
        </Modal>
      </>
    );
}
