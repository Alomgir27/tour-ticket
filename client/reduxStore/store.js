import { configureStore } from "@reduxjs/toolkit";
import ProductsSlicer from "./feature/ProductsSlicer";
import BlogsSlicer from "./feature/BlogsSlicer";
//middleware
import logger from "redux-logger";
import thunk from "redux-thunk";


export const store = configureStore({
    reducer: {
        products: ProductsSlicer,
        blogs: BlogsSlicer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== "production",
});
