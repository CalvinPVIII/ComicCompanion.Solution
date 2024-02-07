import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comic } from "../types";

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

type TagAction = {
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
    addTag: (state, action: PayloadAction<TagAction>) => {
      state.libraryCategories[action.payload.tagId] = { tagName: action.payload.name, comics: [], tagId: action.payload.tagId };
    },
    removeTag: (state, action: PayloadAction<string>) => {
      delete state.libraryCategories[action.payload];
    },
    updateTag: (state, action: PayloadAction<TagAction>) => {
      state.libraryCategories[action.payload.tagId].tagName = action.payload.name;
    },
  },
});

export const { addComic, removeComic, addTag, removeTag, updateTag } = librarySlice.actions;

export default librarySlice.reducer;
