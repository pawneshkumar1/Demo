import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionRow {
  createdAt: string;
  refinery: string;
  description: string;
  type: "buy" | "sell" | "redeem";
  gram: string;
  amount: string;
  balance: string;
}

interface Summary {
  totalBuyGram: string;
  totalSellGram: string;
  totalBuyAmount: string;
  totalSellAmount: string;
  redeem?: string;
}

interface TransactionState {
  goldData: TransactionRow[];
  silverData: TransactionRow[];
  userDetails: any;
  address: any;
  goldSummary: Summary;
  silverSummary: Summary;
  loading: boolean;
  error: string | null;
  msg: string | null;
  pdfLoading: boolean;
}

const initialState: TransactionState = {
  goldData: [],
  silverData: [],
  userDetails: null,
  address: null,
  goldSummary: {
    totalBuyGram: "0",
    totalSellGram: "0",
    totalBuyAmount: "0",
    totalSellAmount: "0",
  },
  silverSummary: {
    totalBuyGram: "0",
    totalSellGram: "0",
    totalBuyAmount: "0",
    totalSellAmount: "0",
  },
  loading: false,
  error: null,
  msg: null,
  pdfLoading: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    fetchTransactionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.goldData = action.payload.goldData || [];
      state.silverData = action.payload.silverData || [];
      state.userDetails = action.payload.userDetails || null;
      state.address = action.payload.address || null;
      state.goldSummary = action.payload.goldSummary || initialState.goldSummary;
      state.silverSummary = action.payload.silverSummary || initialState.silverSummary;
    },
    fetchTransactionsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    sendPdfStart: (state) => {
      state.pdfLoading = true;
    },
    sendPdfSuccess: (state) => {
      state.pdfLoading = false;
      state.msg = "PDF sent successfully";
    },
    sendPdfFailure: (state, action: PayloadAction<string>) => {
      state.pdfLoading = false;
      state.error = action.payload;
    },
    clearMessages: (state) => {
      state.msg = null;
      state.error = null;
    },
  },
});

export const {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  sendPdfStart,
  sendPdfSuccess,
  sendPdfFailure,
  clearMessages,
} = transactionSlice.actions;

export default transactionSlice.reducer;
