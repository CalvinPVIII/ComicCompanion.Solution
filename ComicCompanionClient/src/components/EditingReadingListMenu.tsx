import { useSelector } from "react-redux";
import { currentEditingReadingListSelector, creatingReadingListSelector } from "../redux/readingListReducer";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function EditingReadingListMenu() {
  const isEditing = useSelector(creatingReadingListSelector);
  const currentList = useSelector(currentEditingReadingListSelector);

  if (isEditing && currentList) {
    return (
      <>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Reading List: {currentList.name}
          </MenuButton>
          <MenuList backgroundColor={"blackAlpha.900"}>
            <MenuItem backgroundColor={"blackAlpha.900"}>Name: {currentList.name}</MenuItem>
            <MenuItem backgroundColor={"blackAlpha.900"}>Description: {currentList.description}</MenuItem>
            {currentList.issues.length > 0 ? (
              <>
                {currentList.issues.map((issue) => (
                  <MenuItem backgroundColor={"blackAlpha.900"}>
                    {issue.comicId} issue {issue.issueId}
                  </MenuItem>
                ))}
              </>
            ) : (
              <MenuItem backgroundColor={"blackAlpha.900"}>No issues have been added yet</MenuItem>
            )}
            <MenuItem backgroundColor={"blackAlpha.900"}>
              <Link to="/readinglists/edit">
                <Button>Edit List</Button>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  }
}
