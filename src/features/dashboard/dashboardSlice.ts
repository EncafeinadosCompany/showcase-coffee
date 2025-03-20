import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductTop,
  getEarlyDate,
  getEarnings,
  getTotalLiquidation,
  getTotalDeposits,
  getTotalBrands,
  getTotalSalesByMonth,
  getTotalSalesByYear,
  getSalesCountByMonth,
  getSalesCountByYear,
} from "./dashboardService";

interface DashboardState {
  topProducts: any[];
  earlyDate: any | null;
  earnings: any | null;
  totalLiquidation: number | null;
  totalDeposits: number | null;
  totalBrands: number | null;
  totalSalesMonth: number | null; 
  totalSalesYear: number | null;
  salesCountMonth: number | null; 
  salesCountYear: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  topProducts: [],
  earlyDate: null,
  earnings: null,
  totalLiquidation: null,
  totalDeposits: null,
  totalBrands: null,
  totalSalesMonth: null, 
  totalSalesYear: null,
  salesCountMonth: null,
  salesCountYear: null,
  isLoading: false,
  error: null,
};

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

export const fetchTotalBrands = createAsyncThunk(
  "dashboard/fetchTotalBrands",
  async (_, { rejectWithValue }) => {
    try {
      return await getTotalBrands();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching total brands.");
    }
  }
);

export const fetchTotalSalesByMonth = createAsyncThunk(
  "dashboard/fetchTotalSalesByMonth",
  async ({ month, year }: { month: number; year: number }, { rejectWithValue }) => {
    try {
      return await getTotalSalesByMonth(month, year);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching total sales by month.");
    }
  }
);

export const fetchTotalSalesByYear = createAsyncThunk(
  "dashboard/fetchTotalSalesByYear",
  async ({ year }: { year: number }, { rejectWithValue }) => {
    try {
      return await getTotalSalesByYear(year);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching total sales by year.");
    }
  }
);

export const fetchSalesCountByMonth = createAsyncThunk(
  "dashboard/fetchSalesCountByMonth",
  async ({ month, year }: { month: number; year: number }, { rejectWithValue }) => {
    try {
      return await getSalesCountByMonth(month, year);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching sales count by month.");
    }
  }
);


export const fetchSalesCountByYear = createAsyncThunk(
  "dashboard/fetchSalesCountByYear",
  async ({ year }: { year: number }, { rejectWithValue }) => {
    try {
      return await getSalesCountByYear(year);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching sales count by year.");
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
        state.topProducts = action.payload;
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
      })
       // Total Brands
       .addCase(fetchTotalBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalBrands = action.payload.totalBrands
      })
      .addCase(fetchTotalBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
       // Total Sales by Month
       .addCase(fetchTotalSalesByMonth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalSalesByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalSalesMonth = action.payload.totalSales;
      })
      .addCase(fetchTotalSalesByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Total Sales by Year
      .addCase(fetchTotalSalesByYear.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalSalesByYear.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalSalesYear = action.payload.totalSales;
      })
      .addCase(fetchTotalSalesByYear.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
       // Sales Count by Month
       .addCase(fetchSalesCountByMonth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesCountByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesCountMonth = action.payload.salesCount;
      })
      .addCase(fetchSalesCountByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Sales Count by Year
      .addCase(fetchSalesCountByYear.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesCountByYear.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesCountYear = action.payload.salesCount;
      })
      .addCase(fetchSalesCountByYear.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;