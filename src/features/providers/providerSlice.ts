import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProviders, createProvider, updateProvider } from "./providerService";
import { Provider } from "../../types/providers/providers";
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

// Thunks para las operaciones CRUD
export const fetchProviders = createAsyncThunk("providers/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getProviders();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener proveedores");
  }
});

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


// Slice de Redux
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
      .addCase(addProvider.fulfilled, (state, action) => {
        state.providers.push(action.payload);
      })
      .addCase(editProvider.fulfilled, (state, action) => {
        state.providers = state.providers.map((provider) =>
          provider.id === action.payload.id ? action.payload : provider
        );
      })
  },
});

export default providerSlice.reducer;
