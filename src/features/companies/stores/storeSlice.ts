import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  getStores, createStore, updateStore, deleteStore } from "./storeService";
import {Store} from "../../../types/companies/store";

interface StoreState {
  stores: Store[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  stores: [],
  isLoading: false,
  error: null,
};

export const fetchStores = createAsyncThunk("stores/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getStores();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener tiendas");
  }
});

export const addStore = createAsyncThunk("stores/add", async (store: Omit<Store, "id">, { rejectWithValue }) => {
  try {
    return await createStore(store);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al agregar tienda");
  }
});

export const editStore = createAsyncThunk("stores/edit", async ({ id, store }: { id: string; store: Partial<Store> }, { rejectWithValue }) => {
  try {
    return await updateStore(id, store);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al actualizar tienda");
  }
});

export const removeStore = createAsyncThunk("stores/remove", async (id: string, { rejectWithValue }) => {
  try {
    await deleteStore(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al eliminar tienda");
  }
});

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.stores.push(action.payload);
      })
      .addCase(editStore.fulfilled, (state, action) => {
        state.stores = state.stores.map((store) =>
          store.id === action.payload.id ? action.payload : store
        );
      })
      .addCase(removeStore.fulfilled, (state, action) => {
        state.stores = state.stores.filter((store) => store.id !== Number(action.payload));
      });
  },
});

export default storeSlice.reducer;
