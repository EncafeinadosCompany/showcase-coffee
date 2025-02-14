import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getLiquidation, createLiquidation, getLiquidationById } from "./liquidationService";
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


// Obtener liquidación por ID
export const getID = createAsyncThunk(
  "liquidations/getID",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getLiquidationById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener el liquidation por ID"
      );
    }
  }
);


const liquidationSlice = createSlice({
  name: "liquidations",
  initialState,
  reducers: {
    selectLiquidation(state, action) {
      state.selectedLiquidation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiquidations.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      })
      .addCase(fetchLiquidations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.liquidations = action.payload;
      })
      .addCase(fetchLiquidations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getID.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("liquidación obtenido:", action.payload);
      })
      .addCase(getID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

  },
});

export default liquidationSlice.reducer;