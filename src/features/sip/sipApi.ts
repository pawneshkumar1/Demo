import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import {
  fetchSipStart,
  fetchSipSuccess,
  fetchSipFailure,
} from "./sipSlice";

export const fetchSipByStatus =
  (status: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchSipStart());
    try {
      const url = ENDPOINTS.GET_SIP_STATUS(status);
      const response = await axiosInstance.get(url);
      if (response.data.error === false) {
        dispatch(fetchSipSuccess(response.data.data));
      } else {
        dispatch(fetchSipFailure(response.data.message));
      }
    } catch (error: any) {
      dispatch(
        fetchSipFailure(
          error.response?.data?.message || "Failed to fetch SIP data",
        ),
      );
    }
  };

export const createSipProposal =
  (clientId: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      const url = ENDPOINTS.CREATE_SIP_PROPOSAL(clientId);
      const response = await axiosInstance.post(url, data);
      
      if (response.data.error === false) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to create SIP");
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create SIP",
      );
    }
  };

import { toast } from "react-hot-toast";

export const deleteSipProposal =
  (id: string, currentStatus: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.delete(
        ENDPOINTS.SIP_DELETE(id),
      );
      if (response.data.error === false || !response.data.error) {
        toast.success(response.data.message || "SIP proposal deleted successfully");
        dispatch(fetchSipByStatus(currentStatus));
        return response.data;
      } else {
        toast.error(response.data.message || "Failed to delete SIP proposal");
        return response.data;
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred while deleting the SIP proposal";
      toast.error(errorMsg);
      throw errorMsg;
    }
  };
