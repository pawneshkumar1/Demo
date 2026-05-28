import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import { formatToISO } from "../../utils/queryParam";
import {
  fetchcomplianceRecordsStart,
  fetchcomplianceRecordsSuccess,
  fetchcomplianceRecordsFailure,
} from "./complianceRecordsSlice";

export const fetchcomplianceRecordsReport =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchcomplianceRecordsStart());

      // Construct query params
      const queryParams = new URLSearchParams();
      if (params.investorName) queryParams.append("name", params.investorName);
      if (params.startDate)
        queryParams.append("startDate", formatToISO(params.startDate));
      if (params.endDate)
        queryParams.append("endDate", formatToISO(params.endDate));

      const response = await axiosInstance.get(
        ENDPOINTS.GET_SIP_COMPLIANCE_REPORT(queryParams),
      );
      console.log("object", response);

      const transactions = response.data.data || [];
      console.log(transactions, "transactions");
      const totalAmount = response.data.data || "0";

      dispatch(fetchcomplianceRecordsSuccess({ transactions, totalAmount }));
    } catch (error: any) {
      console.error("Error fetching complianceRecords report:", error);
      dispatch(
        fetchcomplianceRecordsFailure(
          error.response?.data?.message ||
            "Failed to fetch complianceRecords report",
        ),
      );
    }
  };
