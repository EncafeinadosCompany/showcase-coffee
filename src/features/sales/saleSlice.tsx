import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSale, createSale, getSaleById, getSaleVariantById } from "./saleService";
import { Sales } from "../../types/sales/saleModel";

interface SaleState {
  sales: Sales[];
  sale: Sales | null;
  saleVariant: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SaleState = {
  sales: [],
  sale: null,
  saleVariant: null,
  isLoading: false,
  error: null,
};

export const fetchSales = createAsyncThunk("sales/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getSale();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener las ventas");
  }
});

export const fetchSaleById = createAsyncThunk("sales/fetchById", async (id: string, { rejectWithValue }) => {
  try {
    return await getSaleById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener la venta por ID");
  }
});

export const fetchSaleVariantById = createAsyncThunk("sales/fetchVariantById", async (id: string, { rejectWithValue }) => {
  try {
    return await getSaleVariantById(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener la variante de venta por ID");
  }
});

export const addSale = createAsyncThunk("sales/add", async (sales: Omit<Sales, "id">, { rejectWithValue }) => {
  try {
    return await createSale(sales);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al agregar la venta");
  }
});

const SaleSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSaleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSaleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sale = action.payload;
      })
      .addCase(fetchSaleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSaleVariantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSaleVariantById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.saleVariant = action.payload;
      })
      .addCase(fetchSaleVariantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.sales.push(action.payload);
      });
  },
});

export default SaleSlice.reducer;
