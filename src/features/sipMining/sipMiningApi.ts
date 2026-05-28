import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import { formatToISO } from "../../utils/queryParam";
import {
  fetchSipMiningStart,
  fetchSipMiningSuccess,
  fetchSipMiningFailure,
} from "./sipMiningSlice";

export const fetchSipMiningReport =
  (params: any, status: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchSipMiningStart());

      // Construct query params
      const queryParams = new URLSearchParams();
      queryParams.append("name", params.investorName || "");
      queryParams.append(
        "startDate",
        params.startDate ? formatToISO(params.startDate) : "",
      );
      queryParams.append(
        "endDate",
        params.endDate ? formatToISO(params.endDate) : "",
      );

      const statusMap: Record<string, string> = {
        Initialized: "INITIALIZED",
        active: "ACTIVE",
        cancelled: "CANCELLED",
        "mobile sip": "SIP MOBILE",
        "link expired": "LINK EXPIRED",
        "bank approval pending": "BANK APPROVAL PENDING",
      };

      const normalizedStatus = status?.trim().toLowerCase();
      const apiStatus = normalizedStatus
        ? statusMap[normalizedStatus] || status.trim().toUpperCase()
        : "";

      if (apiStatus) {
        queryParams.append("status", apiStatus);
      }

      const response = await axiosInstance.get(
        ENDPOINTS.GET_SIP_MINING(queryParams),
      );
      const response1 = await axiosInstance.get(
        ENDPOINTS.GET_SIP_MINING_MOBILE(queryParams),
      );

      const transactions = response.data.data || [];
      const mobileTransactions = response1.data.data || [];

      dispatch(
        fetchSipMiningSuccess({
          transactions,
          mobileTransactions,
        }),
      );
    } catch (error: any) {
      console.error("Error fetching SipMining report:", error);
      dispatch(
        fetchSipMiningFailure(
          error.response?.data?.message || "Failed to fetch SipMining report",
        ),
      );
    }
  };
