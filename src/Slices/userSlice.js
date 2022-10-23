import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { Encrypt } from "../Functions/utils";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : [
      {
        user_id: uuid(),
        password: Encrypt("admintestuser@2021"),
        email: "testuser@gmail.com",
      },
    ];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpSuccess: (state, action) => {
      // state = [...state,action.payload]
      state = state.push(action.payload);
      // local_state = local_state.push(action.payload)
      localStorage.setItem(
        "user",
        JSON.stringify([...initialState, action.payload])
      );
    },
    resetSuccess: (state, action) => {
      state = initialState;
      localStorage.removeItem("user");
    },
  },
});

export const { signUpSuccess, resetSuccess } = userSlice.actions;
export default userSlice.reducer;
