import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import {
  fetchSellStart,
  fetchSellSuccess,
  fetchSellFailure,
  fetchSellLivePricesStart,
  fetchSellLivePricesSuccess,
  fetchSellLivePricesFailure,
} from "./sellSlice";
import { toast } from "react-hot-toast";

export const fetchAllSellOrders = () => async (dispatch: AppDispatch) => {
  dispatch(fetchSellStart());
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_SELL_ORDERS);
    if (response.data.error === false || !response.data.error) {
      const d = response.data.data || {};
      dispatch(
        fetchSellSuccess({
          inProgressOrders: Array.isArray(d.inProgressOrders)
            ? d.inProgressOrders
            : [],
          executedOrders: Array.isArray(d.executedOrders)
            ? d.executedOrders
            : [],
          expiredOrders: Array.isArray(d.expiredOrders) ? d.expiredOrders : [],
        }),
      );
    } else {
      dispatch(
        fetchSellFailure(
          response.data.message || "Failed to fetch sell orders",
        ),
      );
    }
  } catch (error: any) {
    dispatch(
      fetchSellFailure(
        error.response?.data?.message || "Failed to fetch sell orders",
      ),
    );
  }
};

export const fetchSellLivePrices =
  (provider: "augmont" | "mmtc") => async (dispatch: AppDispatch) => {
    dispatch(fetchSellLivePricesStart());
    try {
      if (provider === "augmont") {
        // Fetch Gold and Silver separately for Augmont
        const [goldRes, silverRes] = await Promise.all([
          axiosInstance.get(ENDPOINTS.AUGMONT_SELL_LIVE_PRICE("gold")),
          axiosInstance.get(ENDPOINTS.AUGMONT_SELL_LIVE_PRICE("silver")),
        ]);

        const goldPrice = parseFloat(goldRes.data?.data || "0");
        const silverPrice = parseFloat(silverRes.data?.data || "0");

        dispatch(
          fetchSellLivePricesSuccess({
            provider: "augmont",
            prices: { gold: goldPrice, silver: silverPrice },
          }),
        );
      } else {
        // MMTC live price (POST request as per component code)
        const [goldRes, silverRes] = await Promise.all([
          axiosInstance.post(ENDPOINTS.MMTC_SELL_LIVE_PRICE, {
            currencyPair: "XAU/INR",
            type: "SELL",
          }),
          axiosInstance.post(ENDPOINTS.MMTC_SELL_LIVE_PRICE, {
            currencyPair: "XAG/INR",
            type: "SELL",
          }),
        ]);

        const goldPrice = parseFloat(
          goldRes.data?.data?.[0]?.preTaxAmount || "0",
        );
        const silverPrice = parseFloat(
          silverRes.data?.data?.[0]?.preTaxAmount || "0",
        );

        dispatch(
          fetchSellLivePricesSuccess({
            provider: "mmtc",
            prices: { gold: goldPrice, silver: silverPrice },
          }),
        );
      }
    } catch (error: any) {
      dispatch(
        fetchSellLivePricesFailure(
          error.response?.data?.message || "Failed to fetch sell prices",
        ),
      );
    }
  };

export const createSellProposal =
  (clientId: string, payload: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.SELL_PROPOSAL_CREATE(clientId),
        // ENDPOINTS.CREATE_SELL_ORDER(clientId),
        payload,
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to create sell proposal";
    }
  };
export const deleteSellProposal =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.delete(
        ENDPOINTS.DELETE_SELL_PROPOSAL(id),
      );
      if (response.data.error === false || !response.data.error) {
        toast.success(response.data.message || "Proposal deleted successfully");
        dispatch(fetchAllSellOrders());
        return response.data;
      } else {
        toast.error(response.data.message || "Failed to delete proposal");
        return response.data;
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred while deleting the proposal";
      toast.error(errorMsg);
      throw errorMsg;
    }
  };

export const resendSellProposal =
  (orderNo: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.RESEND_SELL_PROPOSAL(orderNo),
      );
      if (response.data.error === false || !response.data.error) {
        toast.success(response.data.message || "Link resent successfully");
        return response.data;
      } else {
        toast.error(response.data.message || "Failed to resend link");
        return response.data;
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred while resending the link";
      toast.error(errorMsg);
      throw errorMsg;
    }
  };
