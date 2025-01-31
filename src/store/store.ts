import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import providerReducer from "../features/providers/providerSlice";
import productReducer from "../features/products/products/productSlice";
import variantReducer from "../features/products/variants/vatiantSlice";
import brandReducer from "../features/products/brands/brandSlice";
import attributeReducer from "../features/products/attributes/attributeSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    providers: providerReducer,
    products: productReducer,
    variants: variantReducer,
    brands: brandReducer,
    attributes: attributeReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

