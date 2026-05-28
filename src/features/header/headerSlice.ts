import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

export interface HeaderPriceItem {
  provider: string;
  gold: string;
  silver: string;
  goldTrend?: {
    change: string;
    direction: "up" | "down" | "none";
  };
  silverTrend?: {
    change: string;
    direction: "up" | "down" | "none";
  };
}

interface HeaderState {
  qrCodeUrl: string;
  qrCodeValue: string;
  qrLoading: boolean;
  qrError: string | null;
  prices: HeaderPriceItem[];
  pricesLoading: boolean;
  pricesError: string | null;
}

const initialState: HeaderState = {
  qrCodeUrl: "",
  qrCodeValue: "",
  qrLoading: false,
  qrError: null,
  prices: [],
  pricesLoading: false,
  pricesError: null,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    fetchQrStart: (state) => {
      state.qrLoading = true;
      state.qrError = null;
    },
    fetchQrSuccess: (
      state,
      action: PayloadAction<{ url: string; value: string }>,
    ) => {
      state.qrLoading = false;
      state.qrCodeUrl = action.payload.url;
      state.qrCodeValue = action.payload.value;
      state.qrError = null;
    },
    fetchQrFailure: (state, action: PayloadAction<string>) => {
      state.qrLoading = false;
      state.qrError = action.payload;
    },
    fetchPricesStart: (state) => {
      state.pricesLoading = true;
      state.pricesError = null;
    },
    fetchPricesSuccess: (state, action: PayloadAction<HeaderPriceItem[]>) => {
      state.pricesLoading = false;
      state.prices = action.payload;
    },
    fetchPricesFailure: (state, action: PayloadAction<string>) => {
      state.pricesLoading = false;
      state.pricesError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  fetchQrStart,
  fetchQrSuccess,
  fetchQrFailure,
  fetchPricesStart,
  fetchPricesSuccess,
  fetchPricesFailure,
} = headerSlice.actions;

export default headerSlice.reducer;
