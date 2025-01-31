import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIdVariant, getVariants, createVariant, updateVariant, deleteVariant } from "./variantService";
import { variantType } from "@/types/variants";

interface VariantState {
  variants: variantType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VariantState = {
  variants: [],
  isLoading: false,
  error: null,
};

// Obtener todas las variantes
export const fetchVariants = createAsyncThunk("variants/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getVariants();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener variantes");
  }
});

// Obtener variante por ID
export const getVariantById = createAsyncThunk("variants/getById", async (id: string | number, { rejectWithValue }) => {
  try {
    return await getIdVariant(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener variante por ID");
  }
});

// Agregar una nueva variante
export const addVariant = createAsyncThunk("variants/add", async (variant: Omit<variantType, "id">, { rejectWithValue }) => {
  try {
    return await createVariant(variant);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al agregar variante");
  }
});

// Actualizar variante
export const updateVariantById = createAsyncThunk("variants/update", async ({ id, variant }: { id: string | number; variant: Partial<variantType> }, { rejectWithValue }) => {
  try {
    return await updateVariant(id, variant);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al actualizar variante");
  }
});

// Eliminar variante
export const deleteVariantById = createAsyncThunk("variants/delete", async (id: string | number, { rejectWithValue }) => {
  try {
    await deleteVariant(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al eliminar variante");
  }
});



const variantSlice = createSlice({
  name: "variants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener todas las variantes
      .addCase(fetchVariants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVariants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.variants = action.payload;
      })
      .addCase(fetchVariants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Obtener variante por ID
      .addCase(getVariantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVariantById.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Variante obtenida:", action.payload);
      })
      .addCase(getVariantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Agregar variante
      .addCase(addVariant.fulfilled, (state, action) => {
        state.variants.push(action.payload);
      })
      // Eliminar variante
      .addCase(deleteVariantById.fulfilled, (state, action) => {
        state.variants = state.variants.filter((variant) => variant.id !== action.payload);
      })
      .addCase(getVariantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVariantById.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Variante obtenida:", action.payload);
      })
      .addCase(getVariantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default variantSlice.reducer;
