import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SipMiningRecord {
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

interface SipMiningState {
  transactions: SipMiningRecord[];
  mobileTransactions: SipMiningRecord[];
  totalAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: SipMiningState = {
  transactions: [],
  mobileTransactions: [],
  totalAmount: "0",
  loading: false,
  error: null,
};

const SipMiningSlice = createSlice({
  name: "SipMining",
  initialState,
  reducers: {
    fetchSipMiningStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSipMiningSuccess: (
      state,
      action: PayloadAction<{
        transactions: SipMiningRecord[];
        mobileTransactions: SipMiningRecord[];
      }>,
    ) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.mobileTransactions = action.payload.mobileTransactions;
    },
    fetchSipMiningFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSipMiningState: () => initialState,
  },
});

export const {
  fetchSipMiningStart,
  fetchSipMiningSuccess,
  fetchSipMiningFailure,
  resetSipMiningState,
} = SipMiningSlice.actions;

export default SipMiningSlice.reducer;
