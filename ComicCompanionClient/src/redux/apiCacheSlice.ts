import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comic, ReadingListDto } from "../types";

type CachedComicInfo = { comics: Comic[]; paginationInfo: { maxPage: number; currentPage: number } };
// type CachedReadingListInfo = { lists: ReadingListDto[]; paginationInfo: { maxPage: number; currentPage: number } };

export interface ApiCacheState {
  popularComics?: CachedComicInfo;
  popularReadingLists?: ReadingListDto[];
}

const initialState: ApiCacheState = {};

const apiCacheSlice = createSlice({
  name: "apiCache",
  initialState,
  reducers: {
    setPopularComics: (state, action: PayloadAction<CachedComicInfo>) => {
      state.popularComics = action.payload;
    },
    setPopularReadingLists: (state, action: PayloadAction<ReadingListDto[]>) => {
      state.popularReadingLists = action.payload;
    },
    clearPopularComics: (state) => {
      state.popularComics = undefined;
    },
    clearPopularReadingLists: (state) => {
      state.popularReadingLists = undefined;
    },
  },
});

export default apiCacheSlice.reducer;

export const { setPopularComics, setPopularReadingLists, clearPopularComics, clearPopularReadingLists } = apiCacheSlice.actions;
