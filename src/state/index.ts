import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {},
});

setupListeners(store.dispatch);

export default store;
