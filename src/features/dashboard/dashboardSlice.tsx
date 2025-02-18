import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTotalLiquidacions, getTotalDeposit } from "./dashboardService";
import { TotalLidations, TotalDeposit} from "@/types/dashboard/dashboardModel";


interface FinancialState {
  liquidations: TotalLidations[];
  deposits: TotalDeposit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FinancialState = {
  liquidations: [],
  deposits: [],
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
      });
  },
});

export default financialSlice.reducer;
