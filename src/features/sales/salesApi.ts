import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import { formatToISO } from "../../utils/queryParam";
import {
  fetchsalesStart,
  fetchsalesSuccess,
  fetchsalesFailure,
} from "./salesSlice";

export const fetchsalesReport =
  (params: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchsalesStart());

      const response = await axiosInstance.get(ENDPOINTS.GET_TOTAL_INVESTMENTS, {
        params: {
          name: params.investorName,
          startDate: params.startDate ? formatToISO(params.startDate) : undefined,
          endDate: params.endDate ? formatToISO(params.endDate) : undefined,
        },
      });
      const responseData = response.data.data;
      console.log("responseData:>>>>>>>>>>>>>>>>>>>", responseData);
      const transactions = responseData.transactions || [];
      const totalAumAmount = responseData.totalAumAmount || "0";
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
        fetchsalesSuccess({
          transactions,
          totalAumAmount,
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
      console.error("Error fetching sales report:", error);
      dispatch(
        fetchsalesFailure(
          error.response?.data?.message || "Failed to fetch sales report",
        ),
      );
    }
  };
