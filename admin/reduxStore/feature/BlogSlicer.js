import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  blogList: null,
  blogDetails: null,
  singleBlog: null,
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
    setSingleBlog: (state, action) => {
      state.singleBlog = action.payload;
    },
  },
});

export const blogActions = blogSlicer.actions;
export default blogSlicer.reducer;
