import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductTop,
  getEarlyDate,
  getEarnings,
  getTotalLiquidation,
  getTotalDeposits,
} from "./dashboardService";

interface DashboardState {
  productTop: any[];
  earlyDate: any | null;
  earnings: any | null;
  totalLiquidation: number | null;
  totalDeposits: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  productTop: [],
  earlyDate: null,
  earnings: null,
  totalLiquidation: null,
  totalDeposits: null,
  isLoading: false,
  error: null,
};

// Thunks para obtener los datos del dashboard
export const fetchProductTop = createAsyncThunk(
  "dashboard/fetchProductTop",
  async ({ month, year }: { month: number; year: number }, { rejectWithValue }) => {
    try {
      return await getProductTop(month, year);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching top products.");
    }
  }
);

export const fetchEarlyDate = createAsyncThunk(
  "dashboard/fetchEarlyDate",
  async (_, { rejectWithValue }) => {
    try {
      return await getEarlyDate();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching early date.");
    }
  }
);

export const fetchEarnings = createAsyncThunk(
  "dashboard/fetchEarnings",
  async ({ month, year }: { month: number; year: number }, { rejectWithValue }) => {
    try {
      return await getEarnings(month, year);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching earnings.");
    }
  }
);

export const fetchTotalLiquidation = createAsyncThunk(
  "dashboard/fetchTotalLiquidation",
  async (_, { rejectWithValue }) => {
    try {
      return await getTotalLiquidation();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching total liquidation.");
    }
  }
);

export const fetchTotalDeposits = createAsyncThunk(
  "dashboard/fetchTotalDeposits",
  async (_, { rejectWithValue }) => {
    try {
      return await getTotalDeposits();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching total deposits.");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Product Top
      .addCase(fetchProductTop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductTop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productTop = action.payload;
      })
      .addCase(fetchProductTop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Early Date
      .addCase(fetchEarlyDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEarlyDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.earlyDate = action.payload;
      })
      .addCase(fetchEarlyDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Earnings
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
      })

      // Total Liquidation
      .addCase(fetchTotalLiquidation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalLiquidation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalLiquidation = action.payload.totalLiquidation;
      })
      .addCase(fetchTotalLiquidation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Total Deposits
      .addCase(fetchTotalDeposits.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalDeposits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalDeposits = action.payload.totalDeposits;
      })
      .addCase(fetchTotalDeposits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;