import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIdProduct, getProduct, createProduct } from "./productService";
import { productType } from "@/types/products/product";

interface ProductState {
  products: productType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getProduct();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener proveedores"
      );
    }
  }
);

export const addProducts = createAsyncThunk(
  "products/add",
  async (products: Omit<productType, "id">, { rejectWithValue }) => {
    try {
      return await createProduct(products);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al agregar proveedor"
      );
    }
  }
);

export const getID = createAsyncThunk(
  "products/getID",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getIdProduct(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener el producto por ID"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(getID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getID.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Producto obtenido:", action.payload);
      })
      .addCase(getID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
