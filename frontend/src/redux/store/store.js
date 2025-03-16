import { configureStore } from "@reduxjs/toolkit";
import financialReducer from "../slices/financialSlice";

export const store = configureStore({
  reducer: {
    financial: financialReducer,
  },
});
