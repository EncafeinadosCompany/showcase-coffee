import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastService } from "./toastService";

interface ToastState {
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const toastSlice = createSlice({
  name: "toast",
  initialState: {},
  reducers: {
    showToast: (_state, action: PayloadAction<ToastState>) => {
      const { message, type } = action.payload;
      ToastService[type](message);
    },
  },
});

export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
