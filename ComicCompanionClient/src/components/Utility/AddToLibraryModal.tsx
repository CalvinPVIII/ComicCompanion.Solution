import { Checkbox, Modal, ListItemButton, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addComic, addReadingList, removeComic, removeReadingList } from "../../redux/librarySlice";
import { librarySelector } from "../../redux/store";
import "../../styles/AddToLibraryModal.css";
import { Comic, ReadingListDto } from "../../types";
import React, { useState } from "react";

import { Add, Book } from "@mui/icons-material";
import NewLibraryCategoryField from "../v2/NewLibraryCategoryField";

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

  const [showNewCategoryField, setShowNewCategoryField] = useState(false);

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
      <div id="add-to-library-modal">
        <div className="bg-[#121212] w-96 pb-24 rounded-xl">
          <div>
            <p className="p-6 pb-4 border-b mb-6">
              <span className="mr-3">
                <Book color="primary" />
              </span>
              Add To Library
            </p>
          </div>
          {showNewCategoryField ? (
            <NewLibraryCategoryField addCategoryCallback={handleAddingComicToLibrary} readingListOrComic={props.readingListOrComic} />
          ) : (
            <div className="flex justify-center my-4">
              <Button color="secondary" variant="contained" style={{ width: "21rem" }} onClick={() => setShowNewCategoryField(true)}>
                <span>
                  <Add />
                </span>
                Create New Category
              </Button>
            </div>
          )}

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
                        (readingList) => "readingListId" in readingList && readingList.readingListId === (itemInfo as ReadingListDto).readingListId
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
        </div>
      </div>
    </Modal>
  );
}
