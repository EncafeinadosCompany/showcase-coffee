import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice";

import employeeReducer from "../features/users/employees/employeeSlice";

import providerReducer from "../features/companies/providerSlice";
import storeReducer from "../features/companies/storeSlice";

import productReducer from "../features/products/products/productSlice";
import variantReducer from "../features/products/variants/vatiantSlice";
import brandReducer from "../features/products/brands/brandSlice";
import attributeReducer from "../features/products/attributes/attributeSlice";

import socialNetworkReducer from "../features/products/socialNetworks/socialNetworkSlice";
import shoppingReducer from "../features/transactions/shoppingSlice";
import saleReducer from "../features/transactions/saleSlice";

import depositReducer from "../features/payments/deposits/depositSlice";
import liquidationReducer from "../features/payments/liquidations/liquidationSlice";
import imageReducer from "../features/images/imageSlice";

import dashboardReducer from "../features/dashboard/dashboardSlice";


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

    socialNetworks: socialNetworkReducer,
    shopping: shoppingReducer,
    sales: saleReducer,

    deposits: depositReducer,
    liquidations: liquidationReducer,

    images: imageReducer,

    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

