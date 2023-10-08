import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    products: [],
    error: null,
    destinations: [],
    selectedDestination: null,
    localProducts: [],
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
        setDestinations: (state, action) => {
            state.destinations = action.payload;
        },
        setSelectedDestination: (state, action) => {
            state.selectedDestination = action.payload;
        },
        setLocalProducts: (state, action) => {
            state.localProducts = action.payload;
        },
    },
});

export const productsActions = productsSlicer.actions;
export default productsSlicer.reducer;
