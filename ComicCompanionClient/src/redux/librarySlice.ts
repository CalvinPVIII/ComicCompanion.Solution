import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comic } from "../types";
import { v4 as uuidv4 } from "uuid";

export interface LibraryState {
  libraryCategories: { [key: string]: { tagName: string; comics: Comic[]; tagId: string } };
}

const initialState: LibraryState = {
  libraryCategories: { "1": { tagName: "default", comics: [], tagId: "1" } },
};

type AddComicAction = {
  tagId: string;
  comic: Comic;
};

type UpdateTagAction = {
  tagId: string;
  name: string;
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addComic: (state, action: PayloadAction<AddComicAction>) => {
      if (state.libraryCategories[action.payload.tagId].comics.findIndex((comic) => comic.comicId === action.payload.comic.comicId)) {
        state.libraryCategories[action.payload.tagId].comics.push(action.payload.comic);
      }
    },
    removeComic: (state, action: PayloadAction<AddComicAction>) => {
      const updatedCategoryComics = state.libraryCategories[action.payload.tagId].comics.filter(
        (comic) => comic.comicId !== action.payload.comic.comicId
      );
      state.libraryCategories[action.payload.tagId].comics = updatedCategoryComics;
    },
    addTag: (state, action: PayloadAction<string>) => {
      const catId = uuidv4();
      state.libraryCategories[catId] = { tagName: action.payload, comics: [], tagId: catId };
    },
    removeTag: (state, action: PayloadAction<string>) => {
      delete state.libraryCategories[action.payload];
    },
    updateTag: (state, action: PayloadAction<UpdateTagAction>) => {
      state.libraryCategories[action.payload.tagId].tagName = action.payload.name;
    },
  },
});

export const { addComic, removeComic, addTag, removeTag, updateTag } = librarySlice.actions;

export default librarySlice.reducer;
