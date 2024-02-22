import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlertState {
  message: string;
  severity: "success" | "error";
  durationInSeconds: number;
  visible: boolean;
}

const initialState: AlertState = { message: "", severity: "success", durationInSeconds: 2, visible: false };

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    toggleAlert: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setAlert: (_state, action: PayloadAction<AlertState>) => {
      return action.payload;
    },
  },
});

export default alertSlice.reducer;

export const { toggleAlert, setAlert } = alertSlice.actions;
