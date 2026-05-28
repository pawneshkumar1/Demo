import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import { formatToISO } from "../../utils/queryParam";
import {
  fetchearningsStart,
  fetchearningsSuccess,
  fetchearningsFailure,
} from "./earningsSlice";

export const fetchearningsReport =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchearningsStart());

      // Construct query params
      const queryParams = new URLSearchParams();
      if (params.investorName) queryParams.append("name", params.investorName);
      if (params.startDate)
        queryParams.append("startDate", formatToISO(params.startDate));
      if (params.endDate)
        queryParams.append("endDate", formatToISO(params.endDate));

      const response = await axiosInstance.get(
        ENDPOINTS.GET_PARTNER_INVESTMENTS(queryParams),
      );
      const responseData = response.data.data;
      const transactions = responseData.allTransactions || [];
      const totalAmount = responseData.totalEarning || "0";
      const totalGoldAmount = responseData.totalGoldAmount || "0";
      const totalSilverAmount = responseData.totalSilverAmount || "0";
      const totalAugmontGoldAmount = responseData.totalAugmontGoldAmount || "0";
      const totalAugmontSilverAmount =
        responseData.totalAugmontSilverAmount || "0";
      const totalMMTCGoldAmount = responseData.totalMMTCGoldAmount || "0";
      const totalMMTCSilverAmount = responseData.totalMMTCSilverAmount || "0";
      const totalAugmontGoldSilverAmount =
        responseData.totalAugmontGoldSilverAmount || "0";
      const totalMMTCGoldSilverAmount =
        responseData.totalMMTCGoldSilverAmount || "0";
      dispatch(
        fetchearningsSuccess({
          transactions,
          totalAmount,
          totalGoldAmount,
          totalSilverAmount,
          totalAugmontGoldAmount,
          totalAugmontSilverAmount,
          totalMMTCGoldAmount,
          totalMMTCSilverAmount,
          totalAugmontGoldSilverAmount,
          totalMMTCGoldSilverAmount,
        }),
      );
    } catch (error: any) {
      console.error("Error fetching earnings report:", error);
      dispatch(
        fetchearningsFailure(
          error.response?.data?.message || "Failed to fetch earnings report",
        ),
      );
    }
  };
