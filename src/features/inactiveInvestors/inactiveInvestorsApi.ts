import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import { formatToISO } from "../../utils/queryParam";
import {
  fetchinactiveInvestorsStart,
  fetchinactiveInvestorsSuccess,
  fetchinactiveInvestorsFailure,
} from "./inactiveInvestorsSlice";

export const fetchinactiveInvestorsReport =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchinactiveInvestorsStart());

      // Construct query params
      const queryParams = new URLSearchParams();
      if (params.investorName) queryParams.append("name", params.investorName);
      if (params.startDate)
        queryParams.append("startDate", formatToISO(params.startDate));
      if (params.endDate)
        queryParams.append("endDate", formatToISO(params.endDate));

      const response = await axiosInstance.get(
        ENDPOINTS.GET_INACTIVE_CLIENT_REPORT(queryParams),
      );

      const transactions = response.data.data || [];
      console.log(transactions, "transactions");
      const totalAmount = response.data.data || "0";

      dispatch(fetchinactiveInvestorsSuccess({ transactions, totalAmount }));
    } catch (error: any) {
      console.error("Error fetching inactiveInvestors report:", error);
      dispatch(
        fetchinactiveInvestorsFailure(
          error.response?.data?.message ||
            "Failed to fetch inactiveInvestors report",
        ),
      );
    }
  };
