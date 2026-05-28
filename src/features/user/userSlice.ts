import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  Entityemail?: string;
  dob?: string;
  mobileNo?: string;
  aadharNo?: string;
  Address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  accHoldername?: string;
  accNo?: string;
  Ifsccode?: string;
  panNo?: string;
  userName?: string;
  registerType?: string;
  role?: string;
  EntityType?: string;
  isBlocked?: boolean;
  is_deleted?: number;
  commission_per?: string;
  mmtc_commission_per?: string;
  EntityidentificationNo?: string;
  Gstin?: string;
  companyAddress?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  passwordUpdating: boolean;
  passwordError: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  passwordUpdating: false,
  passwordError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordStart(state) {
      state.passwordUpdating = true;
      state.passwordError = null;
    },
    updatePasswordSuccess(state) {
      state.passwordUpdating = false;
      state.passwordError = null;
    },
    updatePasswordFailure(state, action: PayloadAction<string>) {
      state.passwordUpdating = false;
      state.passwordError = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
  clearProfile,
} = userSlice.actions;
export default userSlice.reducer;
