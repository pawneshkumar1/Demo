import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SIPFund {
  _id: string;
  proposal_no: string;
  client_id: {
    name: string;
  };
  metal_type: string;
  status: string;
  amount: string;
  day_of_month: string | number;
  createdAt: string;
}

interface SIPState {
  sipList: SIPFund[];
  loading: boolean;
  error: string | null;
}

const initialState: SIPState = {
  sipList: [],
  loading: false,
  error: null,
};

const sipSlice = createSlice({
  name: "sip",
  initialState,
  reducers: {
    fetchSipStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSipSuccess: (state, action: PayloadAction<SIPFund[]>) => {
      state.loading = false;
      state.sipList = action.payload;
    },
    fetchSipFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSipStart, fetchSipSuccess, fetchSipFailure } =
  sipSlice.actions;

export default sipSlice.reducer;
