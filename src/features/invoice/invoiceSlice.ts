import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InvoiceTransaction {
  _id: string;
  client_id?: string;
  client_name?: string;
  clientName?: string;
  name?: string;
  amount?: string | number;
  quantity?: string | number;
  gst?: string | number;
  total_amount?: string | number;
  Price?: string | number;
  invoice_url?: string;
  invoice_No?: string;
  metal_type?: string;
  status?: string;
  createdAt?: string;
}

export interface PartnerCommissionSummary {
  _id?: string;
  name?: string;
  email?: string;
  mobileNo?: string;
  status?: string;
  totalCommission?: string | number;
  totalGoldCommission?: string | number;
  totalGoldPreTaxAmount?: string | number;
  totalGoldGst?: string | number;
  totalGoldTotalAmount?: string | number;
  totalGoldQuantity?: string | number;
  totalSilverCommission?: string | number;
  totalSilverPreTaxAmount?: string | number;
  totalSilverGst?: string | number;
  totalSilverTotalAmount?: string | number;
  totalSilverQuantity?: string | number;
  [key: string]: unknown;
}

export interface GeneratedInvoice {
  _id?: string;
  pdfLink?: string;
  [key: string]: unknown;
}

interface InvoiceState {
  partner: PartnerCommissionSummary | null;
  transactions: InvoiceTransaction[];
  loading: boolean;
  generatingInvoice: boolean;
  generatedInvoice: GeneratedInvoice | null;
  error: string | null;
  invoiceError: string | null;
}

const initialState: InvoiceState = {
  partner: null,
  transactions: [],
  loading: false,
  generatingInvoice: false,
  generatedInvoice: null,
  error: null,
  invoiceError: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    fetchInvoiceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInvoiceSuccess: (
      state,
      action: PayloadAction<{
        partner: PartnerCommissionSummary | null;
        transactions: InvoiceTransaction[];
      }>,
    ) => {
      state.loading = false;
      state.partner = action.payload.partner;
      state.transactions = action.payload.transactions;
    },
    fetchInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    generateInvoiceStart: (state) => {
      state.generatingInvoice = true;
      state.invoiceError = null;
    },
    generateInvoiceSuccess: (
      state,
      action: PayloadAction<GeneratedInvoice | null>,
    ) => {
      state.generatingInvoice = false;
      state.generatedInvoice = action.payload;
    },
    generateInvoiceFailure: (state, action: PayloadAction<string>) => {
      state.generatingInvoice = false;
      state.invoiceError = action.payload;
    },
    resetInvoiceState: () => initialState,
  },
});

export const {
  fetchInvoiceStart,
  fetchInvoiceSuccess,
  fetchInvoiceFailure,
  generateInvoiceStart,
  generateInvoiceSuccess,
  generateInvoiceFailure,
  resetInvoiceState,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
