import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice";

import employeeReducer from "../features/users/employees/employeeSlice";

import providerReducer from "../features/companies/providers/providerSlice";
import storeReducer from "../features/companies/stores/storeSlice";

import productReducer from "../features/products/products/productSlice";
import variantReducer from "../features/products/variants/vatiantSlice";
import brandReducer from "../features/products/brands/brandSlice";
import attributeReducer from "../features/products/attributes/attributeSlice";

import shoppingReducer from "../features/transactions/shoppingSlice";
import saleReducer from "../features/transactions/saleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,

    providers: providerReducer,
    stores: storeReducer,

    products: productReducer,
    variants: variantReducer,
    brands: brandReducer,
    attributes: attributeReducer,

    shopping: shoppingReducer,
    sales: saleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

