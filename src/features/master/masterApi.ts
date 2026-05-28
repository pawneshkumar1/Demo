import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import {
  fetchStatesStart,
  fetchStatesSuccess,
  fetchStatesFailure,
  fetchCitiesStart,
  fetchCitiesSuccess,
  fetchCitiesFailure,
} from "./masterSlice";

export const fetchStates = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchStatesStart());
    const response = await axiosInstance.get(ENDPOINTS.GET_STATE_CODE);
    const statesData = response.data.data || response.data;
    dispatch(fetchStatesSuccess(Array.isArray(statesData) ? statesData : []));
  } catch (error: any) {
    console.error("Error fetching states:", error);
    dispatch(fetchStatesFailure(error.response?.data?.message || "Failed to fetch states"));
  }
};

export const fetchCities = (stateId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCitiesStart());
    // The user's example shows a POST request with { _id: id }
    const response = await axiosInstance.post(ENDPOINTS.GET_CITIES_OF_STATE, { _id: stateId });
    const citiesData = response.data.data || response.data;
    dispatch(fetchCitiesSuccess(Array.isArray(citiesData) ? citiesData : []));
  } catch (error: any) {
    console.error("Error fetching cities:", error);
    dispatch(fetchCitiesFailure(error.response?.data?.message || "Failed to fetch cities"));
  }
};
