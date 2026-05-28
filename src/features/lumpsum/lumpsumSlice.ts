import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LumpsumRecord {
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

interface LumpsumState {
  transactions: LumpsumRecord[];
  totalAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: LumpsumState = {
  transactions: [],
  totalAmount: "0",
  loading: false,
  error: null,
};

const lumpsumSlice = createSlice({
  name: "lumpsum",
  initialState,
  reducers: {
    fetchLumpsumStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLumpsumSuccess: (
      state,
      action: PayloadAction<{ transactions: LumpsumRecord[]; totalAmount: string }>,
    ) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalAmount = action.payload.totalAmount;
    },
    fetchLumpsumFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetLumpsumState: () => initialState,
  },
});

export const {
  fetchLumpsumStart,
  fetchLumpsumSuccess,
  fetchLumpsumFailure,
  resetLumpsumState,
} = lumpsumSlice.actions;

export default lumpsumSlice.reducer;
