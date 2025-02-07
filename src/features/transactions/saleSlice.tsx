import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSale, createSale, getSaleById, getShoppingVariant } from "./saleService";
import { Sales, SalesPayload } from "../../types/transactions/saleModel";

interface SaleState {
  sales: Sales[];
  sale: Sales | null;
  saleVariants: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SaleState = {
  sales: [],
  sale: null,
  saleVariants: [],
  isLoading: false,
  error: null,
};

export const fetchSales = createAsyncThunk("sales/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getSale();
  } catch (error: unknown) {
    return rejectWithValue(error instanceof Error ? error.message : "Error al obtener las ventas");
  }
});

export const fetchSaleById = createAsyncThunk(
  "sales/fetchById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      return await getSaleById(id);
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : "Error al obtener la venta por ID");
    }
  }
);

export const fetchSaleVariants = createAsyncThunk(
  "sales/fetchVariants",
  async (_, { rejectWithValue }) => {
    try {
      return await getShoppingVariant();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : "Error al obtener los productos");
    }
  }
);

export const addSale = createAsyncThunk("sales/add", async (sales: SalesPayload, { rejectWithValue }) => {
  try {
    return await createSale(sales);
  } catch (error: unknown) {
    return rejectWithValue(error instanceof Error ? error.message : "Error al agregar la venta");
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
      .addCase(fetchSaleVariants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSaleVariants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.saleVariants = action.payload;
      })
      .addCase(fetchSaleVariants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.sales.push(action.payload);
      });
  },
});

export default SaleSlice.reducer;
