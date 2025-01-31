import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import providerReducer from "../features/providers/providerSlice";
import productReducer from "../features/products/products/productSlice";
import variantReducer from "../features/products/variants/vatiantSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    providers: providerReducer,
    products: productReducer,
    variants: variantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

