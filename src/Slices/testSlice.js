import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("test")
  ? JSON.parse(localStorage.getItem("test"))
  : {
      isSubmit: false,
      data: {},
    };

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    testSuccess: (state, action) => {
      state.isSubmit = true;
      state.data = action.payload;

      localStorage.setItem(
        "test",
        JSON.stringify({
          data: action.payload,
          isSubmit: true,
        })
      );
    },
    testExit: (state, action) => {
      state.data = {};
      state.isSubmit = false;
      localStorage.removeItem("test");
    },
  },
});

export const { testSuccess, testExit } = testSlice.actions;
export const selectisSubmit = (state) => state.test.isSubmit;
export const selectdata = (state) => state.test.data;

export default testSlice.reducer;
