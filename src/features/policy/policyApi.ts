import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import { AppDispatch } from "../../redux/store";
import {
  fetchPolicyStart,
  fetchPolicySuccess,
  fetchPolicyFailure,
  PolicyData,
} from "./policySlice";

/**
 * Fetch a single policy by type
 * @param type - Policy type: 'terms', 'privacy', 'shipping', or 'refund'
 */
export const getPolicy = (type: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchPolicyStart());

    const { data } = await axiosInstance.get(ENDPOINTS.GET_POLICY(type));

    if (data && !data.error) {
      const policyData: PolicyData = {
        type: type as any,
        content: data.data?.content || "",
        title: data.data?.title || "",
        description: data.data?.description || "",
        updatedAt: data.data?.updatedAt,
        createdAt: data.data?.createdAt,
        _id: data.data?._id,
      };

      dispatch(
        fetchPolicySuccess({
          policy: policyData,
          type,
        })
      );

      return policyData;
    } else {
      throw new Error(data?.message || "Failed to fetch policy");
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch policy";

    dispatch(fetchPolicyFailure(errorMessage));
    throw error;
  }
};


