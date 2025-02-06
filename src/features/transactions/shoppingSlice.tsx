import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getShopping, getShoppingVariant, getShoppingById, getShoppingVariantById, createShopping } from "./shoppingService";
import { Shopping, ShoppingVariant2 } from "../../types/transactions/shoppingModel";

interface ShoppingState {
  shopping: Shopping[];
  shoppingItem: Shopping | null;
  shoppingVariant: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ShoppingState = {
  shopping: [],
  shoppingItem: null,
  shoppingVariant: null,
  isLoading: false,
  error: null,
};

export const fetchShopping = createAsyncThunk("shopping/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getShopping();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener la consignación");
  }
});

export const fetchShoppingById = createAsyncThunk("shopping/fetchById", async (id: string, { rejectWithValue }) => {
  try {
    return await getShoppingById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener la consignación por ID");
  }
});

export const fetchShoppingVariant = createAsyncThunk("shopping/fetchVariant", async (_, { rejectWithValue }) => {
  try {
    return await getShoppingVariant();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener las variantes de consignación");
  }
});

export const fetchShoppingVariantById = createAsyncThunk("shopping/fetchVariantById", async (id: string, { rejectWithValue }) => {
  try {
    return await getShoppingVariantById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener la variante de la consignación por ID");
  }
});

export const addShopping = createAsyncThunk("shopping/add", async (shopping: Omit<ShoppingVariant2, "id">, { rejectWithValue }) => {
  try {
    return await createShopping(shopping);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al agregar la consignación");
  }
});

const ShoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopping.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShopping.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopping = action.payload;
      })
      .addCase(fetchShopping.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchShoppingById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShoppingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shoppingItem = action.payload;
      })
      .addCase(fetchShoppingById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchShoppingVariant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShoppingVariant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shoppingVariant = action.payload;
      })
      .addCase(fetchShoppingVariant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchShoppingVariantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShoppingVariantById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shoppingVariant = action.payload;
      })
      .addCase(fetchShoppingVariantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addShopping.fulfilled, (state, action) => {
        state.shopping.push(action.payload);
      });
  },
});

export default ShoppingSlice.reducer;
