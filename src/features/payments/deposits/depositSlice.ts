/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getDeposit, createDeposit, getDepositByLiquidations } from "./depositService";
import { deposit } from "@/types/payments/deposit";

interface DepositState {
  deposits: deposit[];
  selectedDeposit?: deposit | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DepositState = {
  deposits: [],
  selectedDeposit: null,
  isLoading: false,
  error: null,
};

export const fetchDeposits = createAsyncThunk("deposits/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getDeposit();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener depositos");
  }
});

export const addDeposit = createAsyncThunk("deposits/add", async (deposit: Omit<deposit, "id">, { rejectWithValue }) => {
  try {
    return await createDeposit(deposit);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al agregar deposito");
  }
});

export const fetchDepositsByLiquidation = createAsyncThunk(
  "deposits/fetchByLiquidation",
  async (liquidationId: string, { rejectWithValue }) => {
    try {
      return await getDepositByLiquidations(liquidationId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener depósitos");
    }
  }
);

export const fetchTotalDepositsByLiquidation = createAsyncThunk(
  "deposits/fetchTotalByLiquidation",
  async (liquidationId: string, { rejectWithValue }) => {
    try {
      return await getDepositByLiquidations(liquidationId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener depósitos");
    }
  }
);

const depositSlice = createSlice({
  name: "deposits",
  initialState,
  reducers: {
    selectDeposit(state, action) {
      state.selectedDeposit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDeposits.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDeposits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deposits = action.payload;
    });
    builder.addCase(fetchDeposits.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addDeposit.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addDeposit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deposits.push(action.payload);
    });
    builder.addCase(addDeposit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchDepositsByLiquidation.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDepositsByLiquidation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deposits = action.payload;
    });
    builder.addCase(fetchDepositsByLiquidation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchTotalDepositsByLiquidation.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTotalDepositsByLiquidation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deposits = action.payload;
    });
    builder.addCase(fetchTotalDepositsByLiquidation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default depositSlice.reducer;