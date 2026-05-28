import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SipBusinessRecord {
  _id: string;
  result: {
    data: {
      quantity: string;
      totalAmount: string;
      metalType: string;
      rate: string;
      transactionId: string;
      invoiceNumber: string;
      goldBalance: string;
      silverBalance: string;
      uniqueId: string;
      userName: string;
      merchantTransactionId: string;
    };
  };

  message: string;
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

interface SipBusinessState {
  transactions: SipBusinessRecord[];
  totalAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: SipBusinessState = {
  transactions: [],
  totalAmount: "0",
  loading: false,
  error: null,
};

const SipBusinessSlice = createSlice({
  name: "SipBusiness",
  initialState,
  reducers: {
    fetchSipBusinessStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSipBusinessSuccess: (
      state,
      action: PayloadAction<{
        transactions: SipBusinessRecord[];
        totalAmount: string;
      }>,
    ) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalAmount = action.payload.totalAmount;
    },
    fetchSipBusinessFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSipBusinessState: () => initialState,
  },
});

export const {
  fetchSipBusinessStart,
  fetchSipBusinessSuccess,
  fetchSipBusinessFailure,
  resetSipBusinessState,
} = SipBusinessSlice.actions;

export default SipBusinessSlice.reducer;
