import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  blogList: undefined,
  blogDetails: undefined,
};

const blogSlicer = createSlice({
  name: "overviewController",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlogList: (state, action) => {
      state.blogList = action.payload;
    },
    setBlogDetails: (state, action) => {
      state.blogDetails = action.payload;
    },
  },
});

export const blogActions = blogSlicer.actions;
export default blogSlicer.reducer;
