import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import authReducer from "../Slices/authSlice";
import testReducer from "../Slices/testSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    test: testReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  // devTools: false,
});
