import { Checkbox, Modal, List, ListItemButton, ListSubheader } from "@mui/material";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComic, addReadingList, removeComic, removeReadingList } from "../../redux/librarySlice";
import { librarySelector } from "../../redux/store";
import "../../styles/AddToLibraryModal.css";
import { Comic, ReadingListDto } from "../../types";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewCategoryModal from "./NewCategoryModal";

interface AddToLibraryModalProps {
  open: boolean;
  setClose: () => void;
  itemInfo: Comic | ReadingListDto;
  readingListOrComic: "readingList" | "comic";
}

type LibraryCategory = {
  tagId: string;
  tagName: string;
  comics?: Comic[];
  readingLists?: ReadingListDto[];
};

export default function AddToLibraryModal(props: AddToLibraryModalProps) {
  const library = useSelector(librarySelector);
  const dispatch = useDispatch();

  const [addCatModalOpen, setAddCatModalOpen] = useState(false);
  const handleCloseCatModal = () => setAddCatModalOpen(false);
  const handleOpenCatModal = () => setAddCatModalOpen(true);

  const handleAddingComicToLibrary = (tagId: string) => {
    if (props.readingListOrComic === "comic") {
      const comic = props.itemInfo as Comic;
      dispatch(addComic({ comic: comic, tagId: tagId }));
    } else {
      const readingList = props.itemInfo as ReadingListDto;
      dispatch(addReadingList({ readingList: readingList, tagId: tagId }));
    }
  };

  const handleRemovingComicFromLibrary = (tagId: string) => {
    if (props.readingListOrComic === "comic") {
      const comic = props.itemInfo as Comic;
      dispatch(removeComic({ comic: comic, tagId: tagId }));
    } else {
      const readingList = props.itemInfo as ReadingListDto;
      dispatch(removeReadingList({ readingList: readingList, tagId: tagId }));
    }
  };

  const categories = props.readingListOrComic === "comic" ? Object.values(library.comicCategories) : Object.values(library.readingListCategories);
  const itemInfo = props.readingListOrComic === "comic" ? (props.itemInfo as Comic) : (props.itemInfo as ReadingListDto);
  return (
    <Modal open={props.open} onClose={props.setClose}>
      <div id="add-library-modal-wrapper">
        <NewCategoryModal
          open={addCatModalOpen}
          setClose={handleCloseCatModal}
          addCategoryCallback={handleAddingComicToLibrary}
          readingListOrComic={props.readingListOrComic}
        />
        <div id="add-to-library-modal">
          <h4>Add to library</h4>
          <div className="category-options">
            <List>
              <ListSubheader id="add-category-button" onClick={handleOpenCatModal}>
                <AddIcon />
                Add Category
              </ListSubheader>
              {categories.map((cat: LibraryCategory, index) => (
                <React.Fragment key={index}>
                  <label>
                    <ListItemButton>
                      {cat.comics ? (
                        <>
                          {cat.comics.find((comic) => "comicId" in comic && comic.comicId === (itemInfo as Comic).comicId) ? (
                            <>
                              <Checkbox checked={true} onChange={() => handleRemovingComicFromLibrary(cat.tagId)} />
                            </>
                          ) : (
                            <Checkbox checked={false} onChange={() => handleAddingComicToLibrary(cat.tagId)} />
                          )}
                        </>
                      ) : cat.readingLists ? (
                        <>
                          {cat.readingLists.find(
                            (readingList) =>
                              "readingListId" in readingList && readingList.readingListId === (itemInfo as ReadingListDto).readingListId
                          ) ? (
                            <>
                              <Checkbox checked={true} onChange={() => handleRemovingComicFromLibrary(cat.tagId)} />
                            </>
                          ) : (
                            <Checkbox checked={false} onChange={() => handleAddingComicToLibrary(cat.tagId)} />
                          )}
                        </>
                      ) : (
                        <></>
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
