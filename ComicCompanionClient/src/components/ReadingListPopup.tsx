import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { ReadingList } from "../types";

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
          <h2>{readingList.name}</h2>
          <h2>{readingList.description}</h2>
          <h2>{readingList.rating}</h2>
        </ModalContent>
      </Modal>
      <div className="popout-background"></div>
    </>
  );
}
