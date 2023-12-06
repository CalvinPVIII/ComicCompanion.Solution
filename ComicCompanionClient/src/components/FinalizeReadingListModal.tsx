import { Modal, ModalContent, ModalOverlay, FormControl, FormLabel, Input, Radio, RadioGroup, Button } from "@chakra-ui/react";
import { LocalReadingList } from "../redux/readingListReducer";
import ReadingListHelper from "../helpers/ReadingListHelper";
import { IIssue } from "../types";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface FinalizeReadingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  readingList: LocalReadingList;
}

export default function FinalizeReadingListModal(props: FinalizeReadingListModalProps) {
  const dispatch = useDispatch();

  const [inputName, setInputName] = useState(props.readingList.name);
  const [inputDesc, setInputDesc] = useState(props.readingList.description);
  const [inputPrivate, setInputPrivate] = useState();

  const handleRemove = (issue: IIssue) => {
    ReadingListHelper.removeIssueFromList(issue, props.readingList, dispatch);
  };

  const handleSubmitReadingList = () => {
    // add userid
    // add rating
    // add reading list id
    // check for update or new
    // redirect
  };

  return (
    <>
      <Modal isOpen={props.isOpen} closeOnOverlayClick={true} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input type="text" value={inputDesc} onChange={(e) => setInputDesc(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Private</FormLabel>
            <RadioGroup onChange={setInputPrivate} value={inputPrivate}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
          </FormControl>
          {props.readingList.issues.map((issue) => (
            <>
              <p>
                {issue.comicId} {issue.issueId}
              </p>
              <Button
                colorScheme="red"
                size={"xs"}
                onClick={() => {
                  handleRemove(issue);
                }}
              >
                Remove
              </Button>
            </>
          ))}
          <Button colorScheme="green" onClick={handleSubmitReadingList}>
            Submit
          </Button>
        </ModalContent>
      </Modal>
      <div className="popout-background"></div>
    </>
  );
}
