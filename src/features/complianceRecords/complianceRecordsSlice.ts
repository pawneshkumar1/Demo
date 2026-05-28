import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface complianceRecord {
  _id: string;
  name: string;
  Email: string;
  mobileNo: string;
  PanNumber: string;
  dob: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  zip: string;
  bank_account_no: string;
  status: string;
  user: string;
  pan: string;
  address: string;
  bank: string;
}

interface complianceRecordsState {
  transactions: complianceRecord[];
  totalAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: complianceRecordsState = {
  transactions: [],
  totalAmount: "0",
  loading: false,
  error: null,
};

const complianceRecordsSlice = createSlice({
  name: "complianceRecords",
  initialState,
  reducers: {
    fetchcomplianceRecordsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchcomplianceRecordsSuccess: (
      state,
      action: PayloadAction<{
        transactions: complianceRecord[];
        totalAmount: string;
      }>,
    ) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalAmount = action.payload.totalAmount;
    },
    fetchcomplianceRecordsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetcomplianceRecordsState: () => initialState,
  },
});

export const {
  fetchcomplianceRecordsStart,
  fetchcomplianceRecordsSuccess,
  fetchcomplianceRecordsFailure,
  resetcomplianceRecordsState,
} = complianceRecordsSlice.actions;

export default complianceRecordsSlice.reducer;
