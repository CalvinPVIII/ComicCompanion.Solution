import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { ReadingList } from "../types";

import ReadingListInfo from "./ReadingListInfo";

interface ReadingListPopupProps {
  readingList: ReadingList;

  isOpen: boolean;
  onClose: () => void;
}

export default function ReadingListPopup(props: ReadingListPopupProps) {
  const { readingList } = props;
  return (
    <>
      <Modal isOpen={props.isOpen} closeOnOverlayClick={true} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent width={"100%"}>
          <ReadingListInfo readingList={readingList} />
        </ModalContent>
      </Modal>
      <div className="popout-background"></div>
    </>
  );
}
