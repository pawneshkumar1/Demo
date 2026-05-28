import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReportsState {
  sipMiningList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportsState = {
  sipMiningList: [],
  loading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    fetchSipMiningStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSipMiningSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.sipMiningList = action.payload;
    },
    fetchSipMiningFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSipMiningStart,
  fetchSipMiningSuccess,
  fetchSipMiningFailure,
} = reportsSlice.actions;

export default reportsSlice.reducer;
