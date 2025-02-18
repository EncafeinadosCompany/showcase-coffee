import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTotalLiquidacions, getTotalDeposit, getEarnings } from "./dashboardService";
import { TotalLidations, TotalDeposit, Earnings } from "@/types/dashboard/dashboardModel";

interface FinancialState {
  liquidations: TotalLidations[];
  deposits: TotalDeposit[];
  earnings: Earnings | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FinancialState = {
  liquidations: [],
  deposits: [],
  earnings: null,
  isLoading: false,
  error: null,
};

export const fetchTotalLiquidacions = createAsyncThunk(
  "financial/fetchTotalLiquidacions",
  async (_, { rejectWithValue }) => {
    try {
      return await getTotalLiquidacions();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : "Error al obtener las liquidaciones");
    }
  }
);

export const fetchTotalDeposit = createAsyncThunk(
  "financial/fetchTotalDeposit",
  async (_, { rejectWithValue }) => {
    try {
      return await getTotalDeposit();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : "Error al obtener los depósitos");
    }
  }
);

export const fetchEarnings = createAsyncThunk(
  "financial/fetchEarnings",
  async (_, { rejectWithValue }) => {
    try {
      return await getEarnings();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : "Error al obtener las ganancias");
    }
  }
);

const financialSlice = createSlice({
  name: "financial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalLiquidacions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalLiquidacions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.liquidations = action.payload;
      })
      .addCase(fetchTotalLiquidacions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTotalDeposit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalDeposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deposits = action.payload;
      })
      .addCase(fetchTotalDeposit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEarnings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.earnings = action.payload;
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default financialSlice.reducer;
