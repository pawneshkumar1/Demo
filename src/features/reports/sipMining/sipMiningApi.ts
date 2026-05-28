import { AppDispatch } from "../../../redux/store";
import axiosInstance from "../../../services/axiosInstance";
import { ENDPOINTS } from "../../../services/endpoints";
import {
  fetchSipMiningStart,
  fetchSipMiningSuccess,
  fetchSipMiningFailure,
} from "./sipMiningSlice";

export const fetchSipMiningReport =
  (params: {
    name?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchSipMiningStart());
    try {
      const queryParams = new URLSearchParams();
      if (params.name) queryParams.append("name", params.name);
      if (params.startDate) queryParams.append("startDate", params.startDate);
      if (params.endDate) queryParams.append("endDate", params.endDate);
      if (params.status) queryParams.append("status", params.status);

      const url =
        params.status === "SIP MOBILE"
          ? ENDPOINTS.GET_MOBILE_SIP_REPORT(queryParams)
          : ENDPOINTS.GET_SIP_REPORT(queryParams);
      const response = await axiosInstance.get(url);

      if (response.data.error === false) {
        const payload = response.data.data;
        const reports = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.transactions)
            ? payload.transactions
            : [];

        dispatch(fetchSipMiningSuccess(reports));
      } else {
        dispatch(
          fetchSipMiningFailure(
            response.data.message || "Failed to fetch report",
          ),
        );
      }
    } catch (error: any) {
      dispatch(
        fetchSipMiningFailure(
          error.response?.data?.message || "Failed to fetch sip mining report",
        ),
      );
    }
  };
