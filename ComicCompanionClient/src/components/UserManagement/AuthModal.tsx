import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import UserAuthForm from "./UserAuthForm";

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserAuthModal(props: UserAuthModalProps) {
  return (
    <>
      <Modal isOpen={props.isOpen} closeOnOverlayClick={true} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <div style={{ backgroundColor: "rgb(14, 16, 17)", padding: "30px" }}>
            <UserAuthForm />
          </div>
        </ModalContent>
      </Modal>
      <div className="popout-background"></div>
    </>
  );
}
