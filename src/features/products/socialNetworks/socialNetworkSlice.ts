import { SocialNetwork, SocialBrandType } from "@/types/products/socialNetwork";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createSocialBrand, getSocialNetworks } from "./socialNetworkService";

interface SocialNetworkState {
  socialNetworks: SocialNetwork[];
  socialBrand: SocialBrandType[];
  selectedSocialNetwork?: SocialNetwork | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SocialNetworkState = {
  socialNetworks: [],
  socialBrand: [],
  selectedSocialNetwork: null,
  isLoading: false,
  error: null,
};

export const fetchSocialNetworks = createAsyncThunk(
  "socialNetworks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getSocialNetworks();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener redes sociales"
      );
    }
  }
);

export const addSocialBrand = createAsyncThunk(
  "socialNetworks/add",
  async (socialNetwork: Omit<SocialBrandType, "id">, { rejectWithValue }) => {
    try {
      return await createSocialBrand(socialNetwork);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.errors || "Error al agregar red social"
      );
    }
  }
);

const socialNetworkSlice = createSlice({
  name: "socialNetworks",
  initialState,
  reducers: {
    setSelectedSocialNetwork: (state, action: PayloadAction<SocialNetwork>) => {
      state.selectedSocialNetwork = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSocialNetworks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSocialNetworks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.socialNetworks = action.payload;
    });
    builder.addCase(fetchSocialNetworks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(addSocialBrand.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addSocialBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.socialBrand.push(action.payload);
    });
    builder.addCase(addSocialBrand.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default socialNetworkSlice.reducer;
