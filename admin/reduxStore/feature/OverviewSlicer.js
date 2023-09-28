import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  overview: undefined,
  singleOverview: undefined,
};

const overviewSlicer = createSlice({
  name: "overviewController",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOverview: (state, action) => {
      state.overview = action.payload;
    },
    setSingleOverview: (state, action) => {
      state.singleOverview = action.payload;
    },
  },
});

export const overviewActions = overviewSlicer.actions;
export default overviewSlicer.reducer;
