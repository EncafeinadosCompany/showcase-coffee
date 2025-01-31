import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import providerReducer from "../features/providers/providerSlice";
import productReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    providers: providerReducer,
    products: productReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

