import { useSelector } from "react-redux";
import { currentEditingReadingListSelector, creatingReadingListSelector } from "../redux/readingListReducer";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import "../styles/EditingReadingListMenu.css";

import ReadingListHelper from "../helpers/ReadingListHelper";
import { IIssue } from "../types";

import { useDispatch } from "react-redux";

export default function EditingReadingListMenu() {
  const isEditing = useSelector(creatingReadingListSelector);
  const currentList = useSelector(currentEditingReadingListSelector);

  const dispatch = useDispatch();

  const handleRemove = (issue: IIssue) => {
    if (!currentList) return;
    ReadingListHelper.removeIssueFromList(issue, currentList, dispatch);
  };

  if (isEditing && currentList) {
    return (
      <div id="edit-reading-list-menu">
        <div id="editing-reading-list-menu-button">
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Reading List: {currentList.name}
            </MenuButton>
            <p id="editing-reading-list-number">{currentList.issues.length}</p>
            <MenuList backgroundColor={"black"}>
              <MenuItem backgroundColor={"black"}>Name: {currentList.name}</MenuItem>
              <MenuItem backgroundColor={"black"}>Description: {currentList.description}</MenuItem>
              {currentList.issues.length > 0 ? (
                <>
                  {currentList.issues.map((issue) => (
                    <MenuItem backgroundColor={"black"} key={issue.comicId + issue.issueId}>
                      {issue.comicId} issue {issue.issueId}
                      <Button colorScheme="red" size={"xs"} onClick={() => handleRemove(issue)}>
                        Remove
                      </Button>
                    </MenuItem>
                  ))}
                </>
              ) : (
                <MenuItem backgroundColor={"black"}>No issues have been added yet</MenuItem>
              )}
              <MenuItem backgroundColor={"black"}>
                <Link to="/readinglists/edit">
                  <Button>Edit List</Button>
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    );
  }
}
