import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./productsSlice"; // ✅ حرف صغير
import { cartReducer } from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,

  },
});
