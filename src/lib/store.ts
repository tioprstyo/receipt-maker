import { configureStore } from "@reduxjs/toolkit";
import menu from "./state/state";

export const store = configureStore({
  reducer: {
    menu,
  },
  devTools: process.env.NODE_ENV !== "production",
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;