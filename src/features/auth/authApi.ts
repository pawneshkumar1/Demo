import { ENDPOINTS } from "../../services/endpoints";
import { tokenService } from "../../utils/tokenService";
import { AppDispatch } from "../../redux/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from "./authSlice";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-hot-toast";

interface LoginPayload {
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

// POST /login
export const loginUser =
  (payload: LoginPayload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());
      const { data } = await axiosInstance.post(ENDPOINTS.LOGIN, payload);
      if (data.error === true) {
        dispatch(loginFailure(data.message));
      } else {
        tokenService.setTokens(data.token);
        tokenService.setUserType(data.userType);
        dispatch(
          loginSuccess({
            userType: data.userType,
            message: data.message || "Login successful",
          }),
        );
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Login failed";
      dispatch(loginFailure(errorMsg));
    }
  };

// POST /logout
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await axiosInstance.post(ENDPOINTS.LOGOUT);
  } catch {
    // logout even if API call fails
  } finally {
    tokenService.clearTokens();
    dispatch(logout());
  }
};

// POST /password-forget
export const forgotPassword =
  (payload: ForgotPasswordPayload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(forgotPasswordStart());
      const { data } = await axiosInstance.post(
        ENDPOINTS.FORGOT_PASSWORD,
        payload,
      );
      if (data.error === true) {
        dispatch(forgotPasswordFailure(data.message));
      } else {
        dispatch(
          forgotPasswordSuccess(
            data.message || "Reset link sent to your email",
          ),
        );
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to send reset link";
      toast.error(errorMsg);
      dispatch(forgotPasswordFailure(errorMsg));
    }
  };
