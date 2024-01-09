import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactElement } from "react";

export interface ModalState {
  ["isOpen"]: boolean;
  ["content"]: ReactElement | null;
}

const initialState: ModalState = { isOpen: true, content: null };

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export default modalSlice.reducer;

export const { toggleModal, setContent } = modalSlice.actions;
