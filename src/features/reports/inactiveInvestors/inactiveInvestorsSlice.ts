import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface inactiveInvestorsRecord {
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
  bank_account_name: string;
  uniqueId: string;
  ifsc_code: string;
  status: string;
  createdAt: string;
}

interface inactiveInvestorsState {
  transactions: inactiveInvestorsRecord[];
  totalAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: inactiveInvestorsState = {
  transactions: [],
  totalAmount: "0",
  loading: false,
  error: null,
};

const inactiveInvestorsSlice = createSlice({
  name: "inactiveInvestors",
  initialState,
  reducers: {
    fetchinactiveInvestorsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchinactiveInvestorsSuccess: (
      state,
      action: PayloadAction<{
        transactions: inactiveInvestorsRecord[];
        totalAmount: string;
      }>,
    ) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalAmount = action.payload.totalAmount;
    },
    fetchinactiveInvestorsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetinactiveInvestorsState: () => initialState,
  },
});

export const {
  fetchinactiveInvestorsStart,
  fetchinactiveInvestorsSuccess,
  fetchinactiveInvestorsFailure,
  resetinactiveInvestorsState,
} = inactiveInvestorsSlice.actions;

export default inactiveInvestorsSlice.reducer;
