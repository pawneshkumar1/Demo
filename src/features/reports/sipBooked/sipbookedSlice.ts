import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface sipBookedRecord {
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
  subscriptionId: string;
  subReferenceId: string;
  order_type: string;
  frequency: string;
  day_of_month: string;
  sip_status: string;
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

interface sipBookedState {
  transactions: sipBookedRecord[];
  totalAmount: string;
  loading: boolean;
  error: string | null;
}

const initialState: sipBookedState = {
  transactions: [],
  totalAmount: "0",
  loading: false,
  error: null,
};

const sipBookedSlice = createSlice({
  name: "sipBooked",
  initialState,
  reducers: {
    fetchsipBookedStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchsipBookedSuccess: (
      state,
      action: PayloadAction<{ transactions: sipBookedRecord[]; totalAmount: string }>,
    ) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalAmount = action.payload.totalAmount;
    },
    fetchsipBookedFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetsipBookedState: () => initialState,
  },
});

export const {
  fetchsipBookedStart,
  fetchsipBookedSuccess,
  fetchsipBookedFailure,
  resetsipBookedState,
} = sipBookedSlice.actions;

export default sipBookedSlice.reducer;
