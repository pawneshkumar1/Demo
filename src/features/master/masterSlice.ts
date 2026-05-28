import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateData {
  _id: string;
  name: string;
  state?: string;
}

type CityData = string | {
  _id: string;
  name: string;
  city?: string;
};

interface MasterState {
  states: StateData[];
  cities: CityData[];
  loadingStates: boolean;
  loadingCities: boolean;
  error: string | null;
}

const initialState: MasterState = {
  states: [],
  cities: [],
  loadingStates: false,
  loadingCities: false,
  error: null,
};

const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {
    fetchStatesStart: (state) => {
      state.loadingStates = true;
      state.error = null;
    },
    fetchStatesSuccess: (state, action: PayloadAction<StateData[]>) => {
      state.states = action.payload;
      state.loadingStates = false;
    },
    fetchStatesFailure: (state, action: PayloadAction<string>) => {
      state.loadingStates = false;
      state.error = action.payload;
    },
    fetchCitiesStart: (state) => {
      state.loadingCities = true;
      state.error = null;
    },
    fetchCitiesSuccess: (state, action: PayloadAction<CityData[]>) => {
      state.cities = action.payload;
      state.loadingCities = false;
    },
    fetchCitiesFailure: (state, action: PayloadAction<string>) => {
      state.loadingCities = false;
      state.error = action.payload;
    },
    clearCities: (state) => {
      state.cities = [];
    },
  },
});

export const {
  fetchStatesStart,
  fetchStatesSuccess,
  fetchStatesFailure,
  fetchCitiesStart,
  fetchCitiesSuccess,
  fetchCitiesFailure,
  clearCities,
} = masterSlice.actions;

export default masterSlice.reducer;
