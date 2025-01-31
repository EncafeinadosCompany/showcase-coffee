import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIdAttribute, getAttributes, createAttribute, updateAttribute, deleteAttribute } from "./attributeService";
import { attributeType } from "@/types/products/attribute";

interface AttributeState {
  attributes: attributeType[];
  selectedAttribute?: attributeType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AttributeState = {
  attributes: [],
  selectedAttribute: null,
  isLoading: false,
  error: null,
};

// Obtener todos los atributos
export const fetchAttributes = createAsyncThunk("attributes/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getAttributes();
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener atributos");
  }
});

// Obtener un atributo por ID
export const getAttributeById = createAsyncThunk("attributes/getById", async (id: string | number, { rejectWithValue }) => {
  try {
    return await getIdAttribute(id);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener atributo por ID");
  }
});

// Agregar un nuevo atributo
export const addAttribute = createAsyncThunk("attributes/add", async (attribute: Omit<attributeType, "id">, { rejectWithValue }) => {
  try {
    return await createAttribute(attribute);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al agregar atributo");
  }
});

// Actualizar un atributo
export const updateAttributeById = createAsyncThunk("attributes/update", async ({ id, attribute }: { id: string | number; attribute: Partial<attributeType> }, { rejectWithValue }) => {
  try {
    return await updateAttribute(id, attribute);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al actualizar atributo");
  }
});

// Eliminar un atributo
export const deleteAttributeById = createAsyncThunk("attributes/delete", async (id: string | number, { rejectWithValue }) => {
  try {
    await deleteAttribute(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al eliminar atributo");
  }
});

const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAttributes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attributes = action.payload;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      .addCase(getAttributeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAttributeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAttribute = action.payload;
      })
      .addCase(getAttributeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
     
      .addCase(addAttribute.fulfilled, (state, action) => {
        state.attributes.push(action.payload);
      })
      
      .addCase(deleteAttributeById.fulfilled, (state, action) => {
        state.attributes = state.attributes.filter((attr) => attr.id !== action.payload);
      });
  },
});

export default attributeSlice.reducer;
