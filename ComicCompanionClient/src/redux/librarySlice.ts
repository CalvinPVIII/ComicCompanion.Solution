import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comic, ReadingListDto } from "../types";

export interface LibraryState {
  libraryCategories: { [key: string]: { tagName: string; comics: Comic[]; tagId: string } };
  readingListCategories: { [key: string]: { tagName: string; readingLists: ReadingListDto[]; tagId: string } };
}

const initialState: LibraryState = {
  libraryCategories: { "1": { tagName: "Favorites", comics: [], tagId: "1" } },
  readingListCategories: { "1": { tagName: "Favorites", readingLists: [], tagId: "1" } },
};

type AddComicAction = {
  tagId: string;
  comic: Comic;
};

type TagAction = {
  tagId: string;
  name: string;
  readingListOrComic: "comic" | "readingList";
};

type AddReadingListAction = {
  tagId: string;
  readingList: ReadingListDto;
};

type DeleteTagAction = {
  tagId: string;
  readingListOrComic: "comic" | "readingList";
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
    addReadingList: (state, action: PayloadAction<AddReadingListAction>) => {
      if (
        state.readingListCategories[action.payload.tagId].readingLists.findIndex(
          (readingList) => readingList.readingListId === action.payload.readingList.readingListId
        )
      ) {
        state.readingListCategories[action.payload.tagId].readingLists.push(action.payload.readingList);
      }
    },
    removeReadingList: (state, action: PayloadAction<AddReadingListAction>) => {
      const updatedCategoryComics = state.readingListCategories[action.payload.tagId].readingLists.filter(
        (readingList) => readingList.readingListId !== action.payload.readingList.readingListId
      );
      state.readingListCategories[action.payload.tagId].readingLists = updatedCategoryComics;
    },
    addTag: (state, action: PayloadAction<TagAction>) => {
      if (action.payload.readingListOrComic === "comic") {
        state.libraryCategories[action.payload.tagId] = { tagName: action.payload.name, comics: [], tagId: action.payload.tagId };
      } else {
        state.readingListCategories[action.payload.tagId] = { tagName: action.payload.name, readingLists: [], tagId: action.payload.tagId };
      }
    },
    removeTag: (state, action: PayloadAction<DeleteTagAction>) => {
      if (action.payload.readingListOrComic === "comic") {
        delete state.libraryCategories[action.payload.tagId];
      } else {
        delete state.readingListCategories[action.payload.tagId];
      }
    },
    updateTag: (state, action: PayloadAction<TagAction>) => {
      if (action.payload.readingListOrComic === "comic") {
        state.libraryCategories[action.payload.tagId].tagName = action.payload.name;
      } else {
        state.readingListCategories[action.payload.tagId].tagName = action.payload.name;
      }
    },
  },
});

export const { addComic, removeComic, addTag, removeTag, updateTag, addReadingList, removeReadingList } = librarySlice.actions;

export default librarySlice.reducer;
