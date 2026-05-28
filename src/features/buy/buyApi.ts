import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import { fetchBuyStart, fetchBuySuccess, fetchBuyFailure } from "./buySlice";

export const fetchBuyProposals =
  (status: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchBuyStart());
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.GET_BUY_PROPOSALS(status),
      );
      if (response.data.error === false || !response.data.error) {
        const d = response.data.data || {};
        // Pick the right array based on the requested status
        let result: any[] = [];
        if (status === "listInProgress") {
          result = Array.isArray(d.PendingProposals) ? d.PendingProposals : [];
        } else if (status === "listExecuted") {
          result = Array.isArray(d.ExecutedProposals) ? d.ExecutedProposals : [];
        } else if (status === "listExpired") {
          result = Array.isArray(d.ExpiredProposals) ? d.ExpiredProposals : [];
        } else {
          // Fallback: try direct array
          result = Array.isArray(d) ? d : [];
        }
        dispatch(fetchBuySuccess(result));
      } else {
        dispatch(
          fetchBuyFailure(
            response.data.message || "Failed to fetch buy proposals",
          ),
        );
      }
    } catch (error: any) {
      dispatch(
        fetchBuyFailure(
          error.response?.data?.message || "Failed to fetch buy proposals",
        ),
      );
    }
  };


export const createBuyProposal =
  (clientId: string, buyData: any) => async () => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.CREATE_BUY_PROPOSAL(clientId),
        buyData
      );
      if (response.data.error === false || !response.data.error) {
        return response.data;
      }
      throw new Error(response.data.message || "Failed to create buy proposal");
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create buy proposal"
      );
    }
  };
import { toast } from "react-hot-toast";

export const deleteBuyProposal =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.delete(
        ENDPOINTS.DELETE_PROPOSAL(id),
      );
      if (response.data.error === false || !response.data.error) {
        toast.success(response.data.message || "Proposal deleted successfully");
        dispatch(fetchBuyProposals("listInProgress"));
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

