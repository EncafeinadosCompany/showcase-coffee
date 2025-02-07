import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBrandById, getBrands, createBrand, updateBrand, deleteBrand } from "./brandService";
import { brandType } from "@/types/products/brand";

interface BrandState {
  brands: brandType[];
  selectedBrand?: brandType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  selectedBrand: null,
  isLoading: false,
  error: null,
};

// Obtener todas las marcas
export const fetchBrands = createAsyncThunk("brands/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getBrands();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener marcas");
  }
});

// Obtener una marca por ID
export const getBrand = createAsyncThunk("brands/getById", async (id: string | number, { rejectWithValue }) => {
  try {
    return await getBrandById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener marca por ID");
  }
});

// Agregar una nueva marca
export const addBrand = createAsyncThunk("brands/add", async (brand: Omit<brandType, "id">, { rejectWithValue }) => {
  try {
    return await createBrand(brand);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.errors || "Error al agregar marca");
  }
});

// Actualizar una marca
export const updateBrandById = createAsyncThunk("brands/update", async ({ id, brand }: { id: string | number; brand: Partial<brandType> }, { rejectWithValue }) => {
  try {
    return await updateBrand(id, brand);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al actualizar marca");
  }
});

// Eliminar una marca
export const deleteBrandById = createAsyncThunk("brands/delete", async (id: string | number, { rejectWithValue }) => {
  try {
    await deleteBrand(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al eliminar marca");
  }
});

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
    
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBrand = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(addBrand.rejected, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.error = action.payload.map((err: any) => `${err.field}: ${err.msg}`).join(" | ");
        } else {
          state.error = (action.payload as { errors: string })?.errors || "Error desconocido al agregar marca";
        }
      })
      
      .addCase(addBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })

      .addCase(deleteBrandById.fulfilled, (state, action) => {
        state.brands = state.brands.filter((brand) => brand.id !== action.payload);
      });
  },
});

export default brandSlice.reducer;
