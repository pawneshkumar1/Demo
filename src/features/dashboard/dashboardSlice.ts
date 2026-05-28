import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

export interface TopInvestor {
  slno: number;
  name: string;
  mobileNo: string;
  Email: string;
  totalInvestment: string | number;
  [key: string]: any;
}

export interface GraphDataItem {
  month: string;
  gold: string | number;
  silver: string | number;
  goldInRupees: number;
  silverInRupees: number;
  year: string | number;
}

export interface TotalInvestmentsData {
  totalAumAmount: string | number;
  totalGoldAmount: string | number;
  totalSilverAmount: string | number;
  totalGrams: string | number;
  totalGoldGrams: string | number;
  totalSilverGrams: string | number;
  totalAugmontGoldSilverAmount: string | number;
  totalMMTCGoldSilverAmount: string | number;
  totalAugmontGoldAmount: string | number;
  totalMMTCGoldAmount: string | number;
  totalAugmontSilverAmount: string | number;
  totalMMTCSilverAmount: string | number;
  totalAugmontGoldSilverGrams: string | number;
  totalMMTCGoldSilverGrams: string | number;
  totalAugmontGoldGrams: string | number;
  totalMMTCGoldGrams: string | number;
  totalAugmontSilverGrams: string | number;
  totalMMTCSilverGrams: string | number;
  totalAugmontGoldPrecentage: string | number;
  totalMMTCGoldPrecentage: string | number;
  totalAugmontSilverPrecentage: string | number;
  totalMMTCSilverPrecentage: string | number;
  [key: string]: any;
}

interface DashboardState {
  totalInvestments: TotalInvestmentsData | null;
  topInvestors: TopInvestor[];
  graphData: GraphDataItem[];
  totalInvestmentsLoading: boolean;
  topInvestorsLoading: boolean;
  graphLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  totalInvestments: null,
  topInvestors: [],
  graphData: [],
  totalInvestmentsLoading: false,
  topInvestorsLoading: false,
  graphLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchTotalInvestmentsStart: (state) => {
      state.totalInvestmentsLoading = true;
      state.error = null;
    },
    fetchTotalInvestmentsSuccess: (
      state,
      action: PayloadAction<TotalInvestmentsData>,
    ) => {
      state.totalInvestmentsLoading = false;
      state.totalInvestments = action.payload;
    },
    fetchTopInvestorsStart: (state) => {
      state.topInvestorsLoading = true;
      state.error = null;
    },
    fetchTopInvestorsSuccess: (state, action: PayloadAction<TopInvestor[]>) => {
      state.topInvestorsLoading = false;
      state.topInvestors = action.payload;
    },
    fetchGraphDataStart: (state) => {
      state.graphLoading = true;
    },
    fetchGraphDataSuccess: (state, action: PayloadAction<GraphDataItem[]>) => {
      state.graphLoading = false;
      state.graphData = action.payload;
    },
    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.totalInvestmentsLoading = false;
      state.topInvestorsLoading = false;
      state.graphLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  fetchTotalInvestmentsStart,
  fetchTotalInvestmentsSuccess,
  fetchTopInvestorsStart,
  fetchTopInvestorsSuccess,
  fetchGraphDataStart,
  fetchGraphDataSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
