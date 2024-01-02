import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../types";
const initialState: { ["user"]: UserInfo | null } = { user: null };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
