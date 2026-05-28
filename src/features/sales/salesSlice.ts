import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface salesRecord {
  _id: string;
  client_id: {
    _id: string;
    name: string;
  };
  metal_type: string;
  refinery: string;
  commission: string;
  preTaxAmount: string;
  gst: string;
  total_amount: string;
  createdAt: string;
  totalEarning: string;
}

interface salesState {
  transactions: salesRecord[];
  totalAumAmount: string;
  totalGoldAmount: string;
  totalSilverAmount: string;
  totalAugmontGoldAmount: string;
  totalAugmontSilverAmount: string;
  totalMMTCGoldAmount: string;
  totalMMTCSilverAmount: string;
  totalAugmontGoldSilverAmount: string;
  totalMMTCGoldSilverAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: salesState = {
  transactions: [],
  totalAumAmount: "0",
  totalGoldAmount: "0",
  totalSilverAmount: "0",
  totalAugmontGoldAmount: "0",
  totalAugmontSilverAmount: "0",
  totalMMTCGoldAmount: "0",
  totalMMTCSilverAmount: "0",
  totalAugmontGoldSilverAmount: "0",
  totalMMTCGoldSilverAmount: "0",
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    fetchsalesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchsalesSuccess: (
      state,
      action: PayloadAction<{
        transactions: salesRecord[];
        totalAumAmount: string;
        totalGoldAmount: string;
        totalSilverAmount: string;
        totalAugmontGoldAmount: string;
        totalAugmontSilverAmount: string;
        totalMMTCGoldAmount: string;
        totalMMTCSilverAmount: string;
        totalAugmontGoldSilverAmount: string;
        totalMMTCGoldSilverAmount: string;
      }>,
    ) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalAumAmount = action.payload.totalAumAmount;
      state.totalGoldAmount = action.payload.totalGoldAmount;
      state.totalSilverAmount = action.payload.totalSilverAmount;
      state.totalAugmontGoldAmount = action.payload.totalAugmontGoldAmount;
      state.totalAugmontSilverAmount = action.payload.totalAugmontSilverAmount;
      state.totalMMTCGoldAmount = action.payload.totalMMTCGoldAmount;
      state.totalMMTCSilverAmount = action.payload.totalMMTCSilverAmount;
      state.totalAugmontGoldSilverAmount =
        action.payload.totalAugmontGoldSilverAmount;
      state.totalMMTCGoldSilverAmount =
        action.payload.totalMMTCGoldSilverAmount;
    },
    fetchsalesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetsalesState: () => initialState,
  },
});

export const {
  fetchsalesStart,
  fetchsalesSuccess,
  fetchsalesFailure,
  resetsalesState,
} = salesSlice.actions;

export default salesSlice.reducer;
