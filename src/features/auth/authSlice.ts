import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tokenService } from "../../utils/tokenService";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  message: string | null;
  forgotPasswordSuccess: boolean;
  userType: string | null;
}

const initialState: AuthState = {
  isAuthenticated: tokenService.isAuthenticated(),
  loading: false,
  error: null,
  message: null,
  forgotPasswordSuccess: false,
  userType: tokenService.getUserType(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action: PayloadAction<{ userType: string; message: string }>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      if (action.payload.userType) {
        state.userType = action.payload.userType as
          | "partner"
          | "subPartner"
          | "employee";
      }
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
      state.userType = null;
    },
    forgotPasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.forgotPasswordSuccess = false;
    },
    forgotPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.forgotPasswordSuccess = true;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.forgotPasswordSuccess = false;
    },
    clearAuthError(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearAuthError,
} = authSlice.actions;
export default authSlice.reducer;
