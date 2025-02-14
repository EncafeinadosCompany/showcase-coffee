import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createImages } from "./imageService";

interface imageState {
  image: string[]; // Cambiado de "imagen[]" a "string[]"
  isLoading: boolean;
  error: string | null;
}

const initialState: imageState = {
  image: [],
  isLoading: false,
  error: null,
};

export const addImages = createAsyncThunk(
  "images/add",
  async (imageFile: File, { rejectWithValue }) => {
    try {
      return await createImages(imageFile); 
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al agregar la imagen"
      );
    }
  }
);

const ImageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addImages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addImages.fulfilled, (state, action) => {
      state.isLoading = false;

      // action.payload ya es la respuesta del backend
      if (action.payload.image_url) {
        state.image.push(action.payload.image_url); // Guardar la URL de la imagen
      }
    });
    builder.addCase(addImages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default ImageSlice.reducer;
