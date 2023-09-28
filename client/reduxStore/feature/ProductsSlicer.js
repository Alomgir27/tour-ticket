import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    products: undefined,
    error: undefined,
};

const productsSlicer = createSlice({
    name: "productController",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const productsActions = productsSlicer.actions;
export default productsSlicer.reducer;
