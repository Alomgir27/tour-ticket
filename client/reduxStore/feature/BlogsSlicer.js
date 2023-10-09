import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    blogs: [],
    error: null,
    selectedBlog: null,
    topBlogs: [],
};


const blogsSlicer = createSlice({
    name: "blogController",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedBlog: (state, action) => {
            state.selectedBlog = action.payload;
        },
        setTopBlogs: (state, action) => {
            state.topBlogs = action.payload;
        },
    },
});


export const blogsActions = blogsSlicer.actions;
export default blogsSlicer.reducer;