import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PodcastEntry } from "@/types/podcast";

const initialState: PodcastEntry[] = [];

export const podcastListSlice = createSlice({
  name: "podcastList",
  initialState,
  reducers: {
    setPodcastList: (_state, action: PayloadAction<PodcastEntry[]>) => {
      return action.payload;
    },
  },
});

export const { setPodcastList } = podcastListSlice.actions;
export default podcastListSlice.reducer;
