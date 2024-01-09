import { Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { modalOpenSelector, modalContentSelector } from "../redux/store";
import { toggleModal } from "../redux/modalSlice";
import ComicsPage from "./pages/ComicsPage";
import ComicInfo from "./Utility/ComicInfo";

import "../styles/GlobalModal.css";

export default function GlobalModal() {
  const dispatch = useDispatch();
  const modalContent = useSelector(modalContentSelector);
  const modalOpen = useSelector(modalOpenSelector);

  const handleModalClose = () => {
    dispatch(toggleModal(false));
  };

  return (
    <div>
      <Modal open={modalOpen} onClose={handleModalClose} className="global-modal">
        {modalContent.type === "Search Comics" ? (
          <div id="modal-content">
            <ComicsPage />
          </div>
        ) : modalContent.type === "Comic Info" && modalContent.data?.comicId ? (
          <div id="modal-content">
            <ComicInfo comicId={modalContent.data.comicId} />
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}
