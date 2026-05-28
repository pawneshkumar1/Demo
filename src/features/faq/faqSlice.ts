import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FaqQuestion {
  q: string;
  a: string;
}

export interface FaqCategory {
  category: string;
  questions: FaqQuestion[];
}

export interface FaqState {
  faqs: FaqCategory[];
  loading: boolean;
  error: string | null;
}

const defaultFaqData: FaqCategory[] = [
  {
    category: "General",
    questions: [
      {
        q: "What is Bharat Batuk?",
        a: "Bharat Batuk is a premier digital platform for investing in 24K pure gold and silver. We enable users to buy, store, and sell precious metals with 100% security and digital precision.",
      },
      {
        q: "Is it safe to invest through the platform?",
        a: "Yes, 100%. All your digital gold and silver is backed by physical assets stored in secure, insured vaults by BRINKS or similar security providers.",
      },
    ],
  },
  {
    category: "Buying & Selling",
    questions: [
      {
        q: "What is the minimum investment amount?",
        a: "You can start investing with as little as ₹1. We believe wealth creation should be accessible to everyone.",
      },
      {
        q: "Can I take physical delivery?",
        a: "Absolutely. You can request physical delivery of your gold or silver in the form of coins or bars once you accumulate the minimum weight required for delivery.",
      },
    ],
  },
  {
    category: "Security",
    questions: [
      {
        q: "How are the prices determined?",
        a: "Our prices are based on live international market rates, updated in real-time to ensure you get the most accurate and transparent pricing.",
      },
      {
        q: "What happens if I lose my phone?",
        a: "Your digital assets are secured behind your account credentials and multi-factor authentication. You can simply log in from another device and secure your account.",
      },
    ],
  },
];

const initialState: FaqState = {
  faqs: defaultFaqData,
  loading: false,
  error: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    fetchFaqsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFaqsSuccess(state, action: PayloadAction<FaqCategory[]>) {
      state.faqs = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFaqsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      // Keep existing FAQs on error
    },
    clearFaqError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchFaqsStart,
  fetchFaqsSuccess,
  fetchFaqsFailure,
  clearFaqError,
} = faqSlice.actions;

export default faqSlice.reducer;
