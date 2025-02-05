import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "./authService";
import { Employee } from "@/types/users/employee";
import { User } from "@/types/users/user";

interface AuthState {
  user: User | null;
  employee: Employee | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  employee: localStorage.getItem("employee") ? JSON.parse(localStorage.getItem("employee")!) : null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginService(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error en el login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.employee = null;
      state.token = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("employee");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.employee = action.payload.employee;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("employee", JSON.stringify(action.payload.employee));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
