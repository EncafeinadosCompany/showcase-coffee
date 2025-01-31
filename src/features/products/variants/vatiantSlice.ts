import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getIdVariant,
  getVariants,
  createVariant,
  updateVariant,
  deleteVariant,
} from "./variantService";
import { variantType } from "@/types/products/variant";

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


export const fetchVariants = createAsyncThunk(
  "variants/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getVariants();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener variantes"
      );
    }
  }
);

export const getVariantById = createAsyncThunk(
  "variants/getById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      return await getIdVariant(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener variante por ID"
      );
    }
  }
);

export const addVariant = createAsyncThunk(
  "variants/add",
  async (variant: Omit<variantType, "id">, { rejectWithValue }) => {
    try {
      return await createVariant(variant);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al agregar variante"
      );
    }
  }
);


export const updateVariantById = createAsyncThunk(
  "variants/update",
  async (
    { id, variant }: { id: string | number; variant: Partial<variantType> },
    { rejectWithValue }
  ) => {
    try {
      return await updateVariant(id, variant);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al actualizar variante"
      );
    }
  }
);

export const deleteVariantById = createAsyncThunk(
  "variants/delete",
  async (id: string | number, { rejectWithValue }) => {
    try {
      await deleteVariant(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar variante"
      );
    }
  }
);

const variantSlice = createSlice({
  name: "variants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
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

      .addCase(addVariant.fulfilled, (state, action) => {
        state.variants.push(action.payload);
      })
      
      .addCase(deleteVariantById.fulfilled, (state, action) => {
        state.variants = state.variants.filter(
          (variant) => variant.id !== action.payload
        );
      })
  },
});

export default variantSlice.reducer;
