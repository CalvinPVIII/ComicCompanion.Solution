import { Checkbox, Modal, List, ListItemButton, ListSubheader } from "@mui/material";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComic, removeComic } from "../../redux/librarySlice";
import { librarySelector } from "../../redux/store";
import "../../styles/AddToLibraryModal.css";
import { Comic } from "../../types";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewCategoryModal from "./NewCategoryModal";

interface AddToLibraryModalProps {
  open: boolean;
  setClose: () => void;
  comicInfo: Comic;
}

export default function AddToLibraryModal(props: AddToLibraryModalProps) {
  const library = useSelector(librarySelector);
  const categories = Object.values(library.libraryCategories);
  const dispatch = useDispatch();

  const [addCatModalOpen, setAddCatModalOpen] = useState(false);
  const handleCloseCatModal = () => setAddCatModalOpen(false);
  const handleOpenCatModal = () => setAddCatModalOpen(true);

  const handleAddingComicToLibrary = (tagId: string) => {
    dispatch(addComic({ comic: props.comicInfo, tagId: tagId }));
  };

  const handleRemovingComicFromLibrary = (tagId: string) => {
    dispatch(removeComic({ comic: props.comicInfo, tagId: tagId }));
  };

  return (
    <Modal open={props.open} onClose={props.setClose}>
      <div id="add-library-modal-wrapper">
        <NewCategoryModal open={addCatModalOpen} setClose={handleCloseCatModal} addCategoryCallback={handleAddingComicToLibrary} />
        <div id="add-to-library-modal">
          <h4>Add to library</h4>
          <div className="category-options">
            <List>
              <ListSubheader id="add-category-button" onClick={handleOpenCatModal}>
                <AddIcon />
                Add Category
              </ListSubheader>
              {categories.map((cat, index) => (
                <React.Fragment key={index}>
                  <label>
                    <ListItemButton>
                      {cat.comics.find((comic) => comic.comicId === props.comicInfo.comicId) ? (
                        <>
                          <Checkbox checked onChange={() => handleRemovingComicFromLibrary(cat.tagId)} />
                        </>
                      ) : (
                        <Checkbox onChange={() => handleAddingComicToLibrary(cat.tagId)} />
                      )}
                      <span className="category-label">{cat.tagName}</span>
                    </ListItemButton>
                  </label>
                </React.Fragment>
              ))}
            </List>
          </div>
        </div>
      </div>
    </Modal>
  );
}
