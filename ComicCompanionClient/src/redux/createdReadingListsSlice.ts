import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReadingListDto } from "../types";

export interface CreatedReadingListsState {
  [key: string]: ReadingListDto;
}

const initialState: CreatedReadingListsState = {};

const createdReadingListsSlice = createSlice({
  name: "createdReadingLists",
  initialState: initialState,
  reducers: {
    createReadingList: (state, action: PayloadAction<ReadingListDto>) => {
      state[action.payload.readingListId] = action.payload;
    },
    deleteReadingList: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export default createdReadingListsSlice.reducer;

export const { createReadingList, deleteReadingList } = createdReadingListsSlice.actions;
