import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      email: "",
      isAuth: false,
      category: "",
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.email = action.payload.email;
      state.category = action.payload.category;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          email: action.payload.email,
          category: action.payload.category,
          isAuth: true,
        })
      );
    },
    logOutSuccess: (state, action) => {
      state.email = "";
      state.category = "";
      state.isAuth = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logOutSuccess } = authSlice.actions;
export const selectEmail = (state) => state.auth.email;

export default authSlice.reducer;
