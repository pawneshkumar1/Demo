import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PolicyData {
  _id?: string;
  type: "terms" | "privacy" | "shipping" | "refund";
  title?: string;
  description?: string;
  content: string;
  is_deleted?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PolicyState {
  policies: {
    [key: string]: PolicyData;
  };
  currentPolicy: PolicyData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PolicyState = {
  policies: {},
  currentPolicy: null,
  loading: false,
  error: null,
};

const policySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {
    // Get Single Policy
    fetchPolicyStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPolicySuccess(
      state,
      action: PayloadAction<{
        policy: PolicyData;
        type: string;
      }>
    ) {
      state.currentPolicy = action.payload.policy;
      state.policies[action.payload.type] = action.payload.policy;
      state.loading = false;
      state.error = null;
    },
    fetchPolicyFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.currentPolicy = null;
    },

    // Clear Current Policy
    clearCurrentPolicy(state) {
      state.currentPolicy = null;
    },

    // Clear Error
    clearPolicyError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchPolicyStart,
  fetchPolicySuccess,
  fetchPolicyFailure,
  clearCurrentPolicy,
  clearPolicyError,
} = policySlice.actions;

export default policySlice.reducer;
