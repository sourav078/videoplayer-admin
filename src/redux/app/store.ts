import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";

const store = configureStore({
  reducer: {
    // Add reducers here
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
