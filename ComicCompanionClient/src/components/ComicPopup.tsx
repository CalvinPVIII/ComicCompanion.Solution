import ComicInfo from "./ComicInfo";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

interface ComicPopupProps {
  comicId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ComicPopup(props: ComicPopupProps) {
  return (
    <>
      <Modal isOpen={props.isOpen} closeOnOverlayClick={true} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent width={"100%"}>
          <ComicInfo comicId={props.comicId} />
        </ModalContent>
      </Modal>
      <div className="popout-background"></div>
    </>
  );
}
