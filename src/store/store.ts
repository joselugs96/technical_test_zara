import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import podcastReducer from "./podcastSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    podcast: podcastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
