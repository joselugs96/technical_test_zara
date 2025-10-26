import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PodcastDetailType = any;
const initialState: PodcastDetailType | null = null;

export const podcastSlice = createSlice({
  name: "podcast",
  initialState: initialState,
  reducers: {
    setSelectedPodcast: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    clearSelectedPodcast: () => {
      return null;
    },
  },
});

export const { setSelectedPodcast, clearSelectedPodcast } =
  podcastSlice.actions;

export default podcastSlice.reducer;
