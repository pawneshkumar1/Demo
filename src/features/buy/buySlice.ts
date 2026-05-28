import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BuyState {
  buyList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BuyState = {
  buyList: [],
  loading: false,
  error: null,
};

const buySlice = createSlice({
  name: "buy",
  initialState,
  reducers: {
    fetchBuyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBuySuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.buyList = action.payload;
    },
    fetchBuyFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBuyStart, fetchBuySuccess, fetchBuyFailure } =
  buySlice.actions;

export default buySlice.reducer;
