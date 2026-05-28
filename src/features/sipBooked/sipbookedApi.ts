import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import { formatToISO } from "../../utils/queryParam";
import {
  fetchsipBookedStart,
  fetchsipBookedSuccess,
  fetchsipBookedFailure,
} from "./sipbookedSlice";

export const fetchsipBookedReport =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchsipBookedStart());

      // Construct query params
      const queryParams = new URLSearchParams();
      if (params.investorName)
        queryParams.append("name", params.investorName);
      if (params.startDate)
        queryParams.append("startDate", formatToISO(params.startDate));
      if (params.endDate)
        queryParams.append("endDate", formatToISO(params.endDate));

      const response = await axiosInstance.get(
        ENDPOINTS.GET_SIP_BOOKED_REPORT(queryParams),
      );
      console.log(response.data.data,">>>>>>>>>>>sip<<<<<<<<<<<<");
      const transactions = response.data.data?.transactions || [];
      console.log(transactions, "transactions");
      const totalAmount = response.data.data?.totalAmount || "0";

      dispatch(fetchsipBookedSuccess({ transactions, totalAmount }));
    } catch (error: any) {
      console.error("Error fetching Sip-Booked report:", error);
      dispatch(
        fetchsipBookedFailure(
          error.response?.data?.message || "Failed to fetch Sip-Booked report",
        ),
      );
    }
  };
