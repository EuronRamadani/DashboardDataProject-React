import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./modules/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
