import { Modal, ModalContent, ModalOverlay, FormControl, FormLabel, Input, Radio, RadioGroup, Button, FormErrorMessage } from "@chakra-ui/react";
import { LocalReadingList } from "../redux/readingListReducer";
import ReadingListHelper from "../helpers/ReadingListHelper";
import { IIssue, ReadingList } from "../types";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { userSelector } from "../redux/userReducer";
import { useSelector } from "react-redux";

interface FinalizeReadingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  readingList: LocalReadingList;
}

export default function FinalizeReadingListModal(props: FinalizeReadingListModalProps) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const [inputName, setInputName] = useState(props.readingList.name);
  const [invalidName, setInvalidName] = useState(false);

  const [inputDesc, setInputDesc] = useState(props.readingList.description);
  const [invalidDesc, setInvalidDesc] = useState(false);

  const [inputPrivate, setInputPrivate] = useState<string>("");
  const [invalidPrivacy, setInvalidPrivacy] = useState(false);

  // const [apiError, setApiError] = useState("");

  const handleRemove = (issue: IIssue) => {
    ReadingListHelper.removeIssueFromList(issue, props.readingList, dispatch);
  };

  const inputErrors = (): boolean => {
    let errors = false;
    if (!inputName || inputName.length <= 0) {
      setInvalidName(true);
      errors = true;
    } else {
      setInvalidName(false);
      errors = false;
    }
    if (!inputDesc || inputDesc.length <= 0) {
      setInvalidDesc(true);
      errors = true;
    } else {
      setInvalidDesc(false);
      errors = false;
    }
    if (!inputPrivate || inputPrivate.length <= 0) {
      setInvalidPrivacy(true);
      errors = true;
    } else {
      setInvalidPrivacy(false);
      errors = false;
    }
    return errors;
  };

  const handleSubmitReadingList = () => {
    if (inputErrors()) return;
    console.log("test");
    if (!user) return;
    const readingList: ReadingList = {
      readingListId: 0,
      issues: props.readingList.issues,
      isPrivate: inputPrivate === "true" ? true : false,
      userId: user.userId,
      name: inputName,
      description: inputDesc,
      rating: 0,
    };
    console.log(JSON.stringify(readingList));
    fetch(`${import.meta.env.VITE_API_URL}/readinglists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(readingList),
    })
      .then((result) => result.json().then((response) => console.log(response)))
      .catch((error) => {
        console.log("there was an error");
        console.log(error.message);
      });
  };

  //

  return (
    <>
      <Modal isOpen={props.isOpen} closeOnOverlayClick={true} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <FormControl isInvalid={invalidName}>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} />
            <FormErrorMessage>Name is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={invalidDesc}>
            <FormLabel>Description</FormLabel>
            <Input type="text" value={inputDesc} onChange={(e) => setInputDesc(e.target.value)} />
            <FormErrorMessage>Description is required</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={invalidPrivacy}>
            <FormLabel>Private</FormLabel>
            <RadioGroup onChange={setInputPrivate} value={inputPrivate}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
            <FormErrorMessage>Visibility value is required</FormErrorMessage>
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
          {user ? (
            <>
              <Button colorScheme="green" isActive={false} onClick={handleSubmitReadingList}>
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button backgroundColor={"gray.200"}>Please sign in to save your reading list</Button>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="popout-background"></div>
    </>
  );
}
