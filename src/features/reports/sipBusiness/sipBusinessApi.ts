import { AppDispatch } from "../../../redux/store";
import { ENDPOINTS } from "../../../services/endpoints";
import axiosInstance from "../../../services/axiosInstance";
import { formatToISO } from "../../../utils/queryParam";
import {
  fetchSipBusinessStart,
  fetchSipBusinessSuccess,
  fetchSipBusinessFailure,
} from "./sipBusinessSlice";

export const fetchSipBusinessReport =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchSipBusinessStart());

      // Construct query params
      const queryParams = new URLSearchParams();
      if (params.investorName) queryParams.append("name", params.investorName);
      if (params.startDate)
        queryParams.append("startDate", formatToISO(params.startDate));
      if (params.endDate)
        queryParams.append("endDate", formatToISO(params.endDate));

      const response = await axiosInstance.get(
        ENDPOINTS.GET_SIP_BUSINESS_REPORT(queryParams),
      );

      const transactions = response.data.data || [];
      console.log(transactions, "transactions");
      const totalAmount = response.data.total_amount || "0";

      dispatch(fetchSipBusinessSuccess({ transactions, totalAmount }));
    } catch (error: any) {
      console.error("Error fetching SipBusiness report:", error);
      dispatch(
        fetchSipBusinessFailure(
          error.response?.data?.message || "Failed to fetch SipBusiness report",
        ),
      );
    }
  };
