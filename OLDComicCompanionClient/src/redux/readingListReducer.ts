import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIssue } from "../types";

export type LocalReadingList = { name: string; issues: IIssue[]; description: string };

interface ReadingListInitialState {
  creatingReadingList: boolean;
  currentEditingReadingList?: { name: string; issues: IIssue[]; description: string };
}

const initialState: ReadingListInitialState = { creatingReadingList: false, currentEditingReadingList: undefined };

export const readingList = createSlice({
  name: "readingList",
  initialState: initialState,
  reducers: {
    setCreatingReadingList: (state, action: PayloadAction<boolean>) => {
      state.creatingReadingList = action.payload;
    },
    editCurrentEditingReadingList: (state, action: PayloadAction<LocalReadingList>) => {
      state.currentEditingReadingList = action.payload;
    },
  },
});

export const { setCreatingReadingList, editCurrentEditingReadingList } = readingList.actions;

export const creatingReadingListSelector = (state: { readingList: ReadingListInitialState }) => state.readingList.creatingReadingList;
export const currentEditingReadingListSelector = (state: { readingList: ReadingListInitialState }) => state.readingList.currentEditingReadingList;

export default readingList.reducer;
