import { configureStore } from "@reduxjs/toolkit";
import ProductsSlicer from "./feature/ProductsSlicer";

export const store = configureStore({
    reducer: {
        products: ProductsSlicer,
    },
});
