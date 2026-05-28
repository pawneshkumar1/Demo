import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceData {
  gold: number;
  silver: number;
}

interface SellState {
  inProgressOrders: any[];
  executedOrders: any[];
  expiredOrders: any[];
  sellLivePrices: {
    augmont: PriceData;
    mmtc: PriceData;
  };
  loading: boolean;
  sellLivePricesLoading: boolean;
  error: string | null;
}

const initialPriceData: PriceData = { gold: 0, silver: 0 };

const initialState: SellState = {
  inProgressOrders: [],
  executedOrders: [],
  expiredOrders: [],
  sellLivePrices: {
    augmont: initialPriceData,
    mmtc: initialPriceData,
  },
  loading: false,
  sellLivePricesLoading: false,
  error: null,
};

const sellSlice = createSlice({
  name: "sell",
  initialState,
  reducers: {
    fetchSellStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSellSuccess: (
      state,
      action: PayloadAction<{
        inProgressOrders: any[];
        executedOrders: any[];
        expiredOrders: any[];
      }>,
    ) => {
      state.loading = false;
      state.inProgressOrders = action.payload.inProgressOrders;
      state.executedOrders = action.payload.executedOrders;
      state.expiredOrders = action.payload.expiredOrders;
    },
    fetchSellFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Sell Live Price Actions
    fetchSellLivePricesStart: (state) => {
      state.sellLivePricesLoading = true;
    },
    fetchSellLivePricesSuccess: (
      state,
      action: PayloadAction<{
        provider: "augmont" | "mmtc";
        prices: PriceData;
      }>,
    ) => {
      state.sellLivePricesLoading = false;
      state.sellLivePrices[action.payload.provider] = action.payload.prices;
    },
    fetchSellLivePricesFailure: (state, action: PayloadAction<string>) => {
      state.sellLivePricesLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSellStart,
  fetchSellSuccess,
  fetchSellFailure,
  fetchSellLivePricesStart,
  fetchSellLivePricesSuccess,
  fetchSellLivePricesFailure,
} = sellSlice.actions;

export default sellSlice.reducer;
