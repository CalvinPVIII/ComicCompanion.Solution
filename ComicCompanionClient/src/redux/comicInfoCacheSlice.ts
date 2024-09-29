import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comic } from "../types";

export interface ComicInfoCacheState {
  [id: string]: { data: Comic; lastFetched: string };
}

const initialState: ComicInfoCacheState = {};

const comicInfoSlice = createSlice({
  name: "comicInfoCache",
  initialState,
  reducers: {
    setComicInCache: (state, action: PayloadAction<Comic>) => {
      const date = new Date().toISOString();
      state[action.payload.comicId] = { data: action.payload, lastFetched: date };
    },
  },
});

export default comicInfoSlice.reducer;

export const { setComicInCache } = comicInfoSlice.actions;
