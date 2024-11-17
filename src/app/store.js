import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productListSlice"; // Add this line

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    product: productReducer,
  },
});
