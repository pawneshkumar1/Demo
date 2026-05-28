import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

export interface CollateralItem {
  _id: string;
  collateral_name: string;
  type: string;
  pdfUrl: string;
}

export interface YoutubePlaylistItem {
  id?: string;
  snippet: {
    title: string;
    description: string;
    publishedAt?: string;
    thumbnails?: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
    resourceId: {
      videoId: string;
    };
  };
}

interface KnowledgeState {
  collaterals: CollateralItem[];
  collateralsLoading: boolean;
  collateralsError: string | null;
  tutorials: YoutubePlaylistItem[];
  tutorialsLoading: boolean;
  tutorialsError: string | null;
}

const initialState: KnowledgeState = {
  collaterals: [],
  collateralsLoading: false,
  collateralsError: null,
  tutorials: [],
  tutorialsLoading: false,
  tutorialsError: null,
};

const knowledgeSlice = createSlice({
  name: "knowledge",
  initialState,
  reducers: {
    fetchCollateralsStart: (state) => {
      state.collateralsLoading = true;
      state.collateralsError = null;
    },
    fetchCollateralsSuccess: (
      state,
      action: PayloadAction<CollateralItem[]>,
    ) => {
      state.collateralsLoading = false;
      state.collaterals = action.payload;
    },
    fetchCollateralsFailure: (state, action: PayloadAction<string>) => {
      state.collateralsLoading = false;
      state.collateralsError = action.payload;
    },
    fetchTutorialsStart: (state) => {
      state.tutorialsLoading = true;
      state.tutorialsError = null;
    },
    fetchTutorialsSuccess: (
      state,
      action: PayloadAction<YoutubePlaylistItem[]>,
    ) => {
      state.tutorialsLoading = false;
      state.tutorials = action.payload;
    },
    fetchTutorialsFailure: (state, action: PayloadAction<string>) => {
      state.tutorialsLoading = false;
      state.tutorialsError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  fetchCollateralsStart,
  fetchCollateralsSuccess,
  fetchCollateralsFailure,
  fetchTutorialsStart,
  fetchTutorialsSuccess,
  fetchTutorialsFailure,
} = knowledgeSlice.actions;

export default knowledgeSlice.reducer;
