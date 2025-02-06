import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProviders, createProvider, updateProvider, associateProviderToStore, getProvidersByStore } from "./providerService";
import { Provider } from "../../types/companies/provider";

interface ProviderState {
  providers: Provider[];
  isLoading: boolean;
  error: string | null;
}
const initialState: ProviderState = {
  providers: [],
  isLoading: false,
  error: null,
};

export const fetchProviders = createAsyncThunk("providers/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getProviders();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener proveedores");
  }
});

export const fetchProvidersByStore = createAsyncThunk(
  "providers/fetchByStore",
  async (storeId: number, { rejectWithValue }) => {
    try {
      return await getProvidersByStore(storeId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener proveedores de la tienda");
    }
  }
);

export const addProvider = createAsyncThunk(
  "providers/add",
  async (provider: Omit<Provider, "id">, { rejectWithValue }) => {
    try {
      return await createProvider(provider);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al agregar proveedor");
    }
  }
);

export const associateProvider = createAsyncThunk(
  "providers/associate",
  async ({ storeId, providerId }: { storeId: number; providerId: number }, { rejectWithValue }) => {
    try {
      await associateProviderToStore(storeId, providerId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al asociar proveedor a la tienda");
    }
  }
);

export const editProvider = createAsyncThunk(
  "providers/edit",
  async ({ id, provider }: { id: string; provider: Partial<Provider> }, { rejectWithValue }) => {
    try {
      return await updateProvider(id, provider);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al actualizar proveedor");
    }
  }
);

const providerSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProvidersByStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProvidersByStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.providers = action.payload;
      })
      .addCase(fetchProvidersByStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addProvider.fulfilled, (state, action) => {
        state.providers.push(action.payload);
      })
      .addCase(associateProvider.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(editProvider.fulfilled, (state, action) => {
        state.providers = state.providers.map((provider) =>
          provider.id === action.payload.id ? action.payload : provider
        );
      });
  },
});

export default providerSlice.reducer;
