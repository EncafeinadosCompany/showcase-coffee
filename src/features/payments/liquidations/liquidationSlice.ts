import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getLiquidation, createLiquidation } from "./liquidationService";
import { Liquidation } from "@/types/payments/liquidation";

interface LiquidationState {
  liquidations: Liquidation[];
  selectedLiquidation?: Liquidation | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LiquidationState = {
  liquidations: [],
  selectedLiquidation: null,
  isLoading: false,
  error: null,
};

// Obtener todas las liquidaciones
export const fetchLiquidations = createAsyncThunk("liquidations/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getLiquidation();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener liquidaciones");
  }
});

// Agregar una nueva liquidación
export const addLiquidation = createAsyncThunk("liquidations/add", async (liquidation: Omit<Liquidation, "id">, { rejectWithValue }) => {
  try {
    return await createLiquidation(liquidation);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al agregar liquidación");
  }
});

const liquidationSlice = createSlice({
  name: "liquidations",
  initialState,
  reducers: {
    selectLiquidation(state, action) {
      state.selectedLiquidation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLiquidations.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLiquidations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.liquidations = action.payload;
    });
    builder.addCase(fetchLiquidations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addLiquidation.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addLiquidation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.liquidations.push(action.payload);
    });
    builder.addCase(addLiquidation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default liquidationSlice.reducer;