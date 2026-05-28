import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import { formatToISO } from "../../utils/queryParam";
import {
  fetchmissingSipStart,
  fetchmissingSipSuccess,
  fetchmissingSipFailure,
} from "./missingSipSlice";

export const fetchmissingSipReport =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchmissingSipStart());

      // Construct query params
      const queryParams = new URLSearchParams();
      if (params.investorName) queryParams.append("name", params.investorName);
      if (params.startDate)
        queryParams.append("startDate", formatToISO(params.startDate));
      if (params.endDate)
        queryParams.append("endDate", formatToISO(params.endDate));

      const response = await axiosInstance.get(
        ENDPOINTS.GET_MISSING_SIP_REPORT(queryParams),
      );

      const transactions = response.data.data || [];
      console.log(transactions, "transactions");
      const totalAmount = response.data.data || "0";

      dispatch(fetchmissingSipSuccess({ transactions, totalAmount }));
    } catch (error: any) {
      console.error("Error fetching missingSip report:", error);
      dispatch(
        fetchmissingSipFailure(
          error.response?.data?.message || "Failed to fetch missingSip report",
        ),
      );
    }
  };
