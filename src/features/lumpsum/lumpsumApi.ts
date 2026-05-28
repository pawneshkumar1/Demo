import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import { formatToISO } from "../../utils/queryParam";
import {
  fetchLumpsumStart,
  fetchLumpsumSuccess,
  fetchLumpsumFailure,
} from "./lumpsumSlice";

export const fetchLumpsumReport =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchLumpsumStart());

      // Construct query params
      const queryParams = new URLSearchParams();
      if (params.investorName)
        queryParams.append("name", params.investorName);
      if (params.startDate)
        queryParams.append("startDate", formatToISO(params.startDate));
      if (params.endDate)
        queryParams.append("endDate", formatToISO(params.endDate));

      const response = await axiosInstance.get(
        ENDPOINTS.GET_LUMP_SUM_REPORT(queryParams),
      );

      const transactions = response.data.data?.transactions || [];
      console.log(transactions, "transactions");
      const totalAmount = response.data.data?.totalAmount || "0";

      dispatch(fetchLumpsumSuccess({ transactions, totalAmount }));
    } catch (error: any) {
      console.error("Error fetching lumpsum report:", error);
      dispatch(
        fetchLumpsumFailure(
          error.response?.data?.message || "Failed to fetch lumpsum report",
        ),
      );
    }
  };
