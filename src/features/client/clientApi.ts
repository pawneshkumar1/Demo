import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import {
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsFailure,
  sendEmailOtpStart,
  sendEmailOtpSuccess,
  sendEmailOtpFailure,
  verifyEmailOtpStart,
  verifyEmailOtpSuccess,
  verifyEmailOtpFailure,
  sendMobileOtpStart,
  sendMobileOtpSuccess,
  sendMobileOtpFailure,
  verifyMobileOtpStart,
  verifyMobileOtpSuccess,
  verifyMobileOtpFailure,
  createClientStart,
  createClientSuccess,
  createClientFailure,
  setSelectedClient,
} from "./clientSlice";

export const fetchClients = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchClientsStart());
    const { data } = await axiosInstance.get(ENDPOINTS.CLIENT_LIST);

    if (data?.error === true) {
      throw new Error(data.message || "Failed to fetch client list");
    }

    dispatch(
      fetchClientsSuccess({
        clients: data.data || [],
        total: data.totalClients || 0,
      }),
    );
  } catch (error: any) {
    dispatch(
      fetchClientsFailure(
        error.message || "An error occurred while fetching client list",
      ),
    );
  }
};

export const sendEmailOtp = (email: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(sendEmailOtpStart());
    const { data } = await axiosInstance.post(ENDPOINTS.SEND_EMAIL_OTP, {
      email,
    });
    if (data?.error)
      throw new Error(data.message || "Failed to send email OTP");
    dispatch(sendEmailOtpSuccess());
    return data;
  } catch (error: any) {
    dispatch(sendEmailOtpFailure(error.message || "Failed to send email OTP"));
    throw error;
  }
};

export const verifyEmailOtp =
  (email: string, otp: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(verifyEmailOtpStart());
      const { data } = await axiosInstance.post(ENDPOINTS.VERIFY_EMAIL_OTP, {
        email,
        otp,
      });
      if (data?.error)
        throw new Error(data.message || "Failed to verify email OTP");
      dispatch(verifyEmailOtpSuccess());
      return data;
    } catch (error: any) {
      dispatch(
        verifyEmailOtpFailure(error.message || "Failed to verify email OTP"),
      );
      throw error;
    }
  };

export const sendMobileOtp =
  (mobileNo: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(sendMobileOtpStart());
      const { data } = await axiosInstance.post(ENDPOINTS.SEND_MOBILE_OTP, {
        mobileNo,
      });
      if (data?.error)
        throw new Error(data.message || "Failed to send mobile OTP");
      dispatch(sendMobileOtpSuccess());
      return data;
    } catch (error: any) {
      dispatch(
        sendMobileOtpFailure(error.message || "Failed to send mobile OTP"),
      );
      throw error;
    }
  };

export const verifyMobileOtp =
  (mobileNo: string, otp: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(verifyMobileOtpStart());
      const { data } = await axiosInstance.post(ENDPOINTS.VERIFY_MOBILE_OTP, {
        mobileNo,
        otp,
      });
      if (data?.error)
        throw new Error(data.message || "Failed to verify mobile OTP");
      dispatch(verifyMobileOtpSuccess());
      return data;
    } catch (error: any) {
      dispatch(
        verifyMobileOtpFailure(error.message || "Failed to verify mobile OTP"),
      );
      throw error;
    }
  };

export const createClient =
  (payload: {
    name: string;
    Email: string;
    mobileNo: string;
    Eotp: string;
    Motp: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(createClientStart());
      const { data } = await axiosInstance.post(
        ENDPOINTS.CLIENT_CREATE,
        payload,
      );
      if (data?.error)
        throw new Error(data.message || "Failed to create client");

      dispatch(createClientSuccess());
      // Refresh client list
      dispatch(fetchClients());
      return data;
    } catch (error: any) {
      dispatch(createClientFailure(error.message || "Failed to create client"));
      throw error;
    }
  };

export const fetchClientById = (clientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchClientsStart());
    const { data } = await axiosInstance.get(ENDPOINTS.CLIENT_BY_ID(clientId));
    if (data?.error) throw new Error(data.message || "Failed to fetch client");
    dispatch(setSelectedClient(data.data || null));
    return data.data;
  } catch (error: any) {
    dispatch(fetchClientsFailure(error.message || "Failed to fetch client"));
    throw error;
  }
};
