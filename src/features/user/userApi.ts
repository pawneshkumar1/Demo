import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import { tokenService } from "../../utils/tokenService";
import { decryptData } from "../../utils/encryptionHelper";
import { AppDispatch } from "../../redux/store";
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
} from "./userSlice";

export const getProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchProfileStart());
    const token = tokenService.getAccessToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const { data } = await axiosInstance.get(ENDPOINTS.PROFILE);

    // Manual decryption fallback if not handled by interceptor
    const finalData = data?.encrypted ? decryptData(data) : data;
    let profileData = finalData?.data || finalData;

    // Handle array response by taking the first element
    if (Array.isArray(profileData)) {
      profileData = profileData[0];
    }

    dispatch(fetchProfileSuccess(profileData));
    return profileData;
  } catch (error: any) {
    dispatch(
      fetchProfileFailure(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch profile",
      ),
    );
    throw error;
  }
};

export const updateProfile =
  (payload: Record<string, any>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchProfileStart());
      const token = tokenService.getAccessToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const { data } = await axiosInstance.put(
        ENDPOINTS.PROFILE_UPDATE,
        payload,
      );

      // Manual decryption fallback
      const finalData = data?.encrypted ? decryptData(data) : data;
      let profileData = finalData?.data || finalData;

      // Handle array response
      if (Array.isArray(profileData)) {
        profileData = profileData[0];
      }

      dispatch(fetchProfileSuccess(profileData));
      return profileData;
    } catch (error: any) {
      dispatch(
        fetchProfileFailure(
          error.response?.data?.message ||
            error.message ||
            "Failed to update profile",
        ),
      );
    }
  };
export const updatePassword =
  (payload: {
    old_password: string;
    new_password: string;
    confirmPassword: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(updatePasswordStart());
      const token = tokenService.getAccessToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const { data } = await axiosInstance.post(
        ENDPOINTS.PROFILE_PASSWORD_CHANGE,
        payload,
      );

      const finalData = data?.encrypted ? decryptData(data) : data;

      if (finalData?.error) {
        throw new Error(finalData.message || "Failed to update password");
      }

      dispatch(updatePasswordSuccess());
      return finalData;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to update password";
      dispatch(updatePasswordFailure(errorMsg));
      throw error;
    }
  };