import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productListSlice"; // Add this line
import cartReducer from "../features/cart/cartSlice"; // Add this line
import authReducer from "../features/auth/authSlice"; // Add this line
import orderReducer from "../features/order/orderSlice"; // Add this line
import userReducer from "../features/user/UserSlice"; // Add this line
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer, // Add this line
    user: userReducer, // Add this line
  },
});
