import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comic, ReadingListDto } from "../types";

export interface ApiCacheState {
  popularComics?: Comic[];
  popularReadingLists?: ReadingListDto[];
}

const initialState: ApiCacheState = {};

const apiCacheSlice = createSlice({
  name: "apiCache",
  initialState,
  reducers: {
    setPopularComics: (state, action: PayloadAction<Comic[]>) => {
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
