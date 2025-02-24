import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
};

// Acción asíncrona opcional (Ejemplo: Obtener el total de ítems desde una API)
export const fetchTotalItems = createAsyncThunk(
  "pagination/fetchTotalItems",
  async (_, { rejectWithValue }) => {
    try {
      // Simulación de API (reemplaza esto con una llamada real)
      const response = await new Promise<{ totalItems: number }>((resolve) =>
        setTimeout(() => resolve({ totalItems: 100 }), 500)
      );
      return response.totalItems;
    } catch (error: any) {
      return rejectWithValue("Error al obtener total de ítems");
    }
  }
);

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Resetear a la primera página al cambiar los items por página
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
      const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      if (state.currentPage > totalPages && totalPages > 0) {
        state.currentPage = totalPages;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTotalItems.fulfilled, (state, action) => {
      state.totalItems = action.payload;
    });
    builder.addCase(fetchTotalItems.rejected, (_state, action) => {
      console.error(action.payload);
    });
  },
});

// Exportar acciones y reducer
export const { setCurrentPage, setItemsPerPage, setTotalItems } = paginationSlice.actions;
export default paginationSlice.reducer;
