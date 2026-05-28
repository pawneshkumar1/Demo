import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MetalPortfolio {
  investedAmount: number;
  currentAmount: number;
  profitORloss: number;
  percent: number;
  available: number;
  locked: number;
}

export interface ProviderPortfolio {
  gold: MetalPortfolio;
  silver: MetalPortfolio;
}

export interface PortfolioData {
  customerRefNo: string;
  augmont: ProviderPortfolio;
  mmtc: ProviderPortfolio;
}

interface PortfolioState {
  data: PortfolioData;
  loading: boolean;
  error: string | null;
}

const initialMetal: MetalPortfolio = {
  investedAmount: 0, currentAmount: 0, profitORloss: 0,
  percent: 0, available: 0, locked: 0,
};

const initialProvider: ProviderPortfolio = {
  gold: { ...initialMetal },
  silver: { ...initialMetal },
};

const initialState: PortfolioState = {
  data: {
    customerRefNo: "",
    augmont: { ...initialProvider },
    mmtc: { ...initialProvider },
  },
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    fetchPortfolioStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPortfolioSuccess: (state, action: PayloadAction<PortfolioData>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProviderPortfolioSuccess: (
      state,
      action: PayloadAction<{
        provider: "augmont" | "mmtc";
        data: ProviderPortfolio;
        customerRefNo?: string;
      }>,
    ) => {
      state.loading = false;
      const { provider, data, customerRefNo } = action.payload;
      state.data[provider] = data;
      if (customerRefNo) {
        state.data.customerRefNo = customerRefNo;
      }
    },
    fetchPortfolioFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPortfolio: (state) => {
      state.data = initialState.data;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchPortfolioStart,
  fetchPortfolioSuccess,
  fetchProviderPortfolioSuccess,
  fetchPortfolioFailure,
  clearPortfolio,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
