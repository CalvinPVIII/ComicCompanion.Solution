import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalContent = {
  type: "Search Comics" | "Comic Info" | "Finalize Reading List" | null;
  data?: { comicId: string; issueId?: string };
};

export interface ModalState {
  ["isOpen"]: boolean;
  ["content"]: ModalContent;
}

const initialState: ModalState = { isOpen: false, content: { type: "Finalize Reading List" } };

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
