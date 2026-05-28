import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface missingSipRecord {
  _id: string;
  client_id: {
    _id: string;
    name: string;
  };
  partner_id: string;
  proposal_id: string;
  amount: string;
  quantity: string;
  gst: string;
  total_amount: string;
  Price: string;
  invoice_url: string;
  status: string;
  payment_method: string;
  transaction_id: string;
  invoice_No: string;
  merchant_transaction_id: string;
  metal_type: string;
  commission: string;
  payment_id?: string;
  flag: string;
  mode: string;
  preTaxAmount: string;
  refinery: string;
  customerRefNo: string;
  partner_comm_per?: number;
  sub_partner_comm_per?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface missingSipState {
  transactions: missingSipRecord[];
  totalAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: missingSipState = {
  transactions: [],
  totalAmount: "0",
  loading: false,
  error: null,
};

const missingSipSlice = createSlice({
  name: "missingSip",
  initialState,
  reducers: {
    fetchmissingSipStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchmissingSipSuccess: (
      state,
      action: PayloadAction<{
        transactions: missingSipRecord[];
        totalAmount: string;
      }>,
    ) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalAmount = action.payload.totalAmount;
    },
    fetchmissingSipFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetmissingSipState: () => initialState,
  },
});

export const {
  fetchmissingSipStart,
  fetchmissingSipSuccess,
  fetchmissingSipFailure,
  resetmissingSipState,
} = missingSipSlice.actions;

export default missingSipSlice.reducer;
