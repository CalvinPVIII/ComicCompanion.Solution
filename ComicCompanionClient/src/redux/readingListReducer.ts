import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIssue } from "../types";

interface ReadingListInitialState {
  creatingReadingList: boolean;
  currentEditingReadingList: IIssue[];
}

const initialState: ReadingListInitialState = { creatingReadingList: false, currentEditingReadingList: [] };

export const readingList = createSlice({
  name: "readingList",
  initialState: initialState,
  reducers: {
    setCreatingReadingList: (state, action: PayloadAction<boolean>) => {
      state.creatingReadingList = action.payload;
    },
    editCurrentEditingReadingList: (state, action: PayloadAction<Array<IIssue>>) => {
      state.currentEditingReadingList = action.payload;
    },
  },
});

export const { setCreatingReadingList, editCurrentEditingReadingList } = readingList.actions;

export const creatingReadingListSelector = (state: ReadingListInitialState) => state.creatingReadingList;
export const currentEditingReadingListSelector = (state: ReadingListInitialState) => state.currentEditingReadingList;

export default readingList.reducer;
