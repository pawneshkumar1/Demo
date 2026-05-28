import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import {
  fetchKycStart,
  fetchKycSuccess,
  fetchKycFailure,
  savePanStart,
  savePanSuccess,
  savePanFailure,
  saveAddressStart,
  saveAddressSuccess,
  saveAddressFailure,
  saveBankStart,
  saveBankSuccess,
  saveBankFailure,
  fetchKycClientListStart,
  fetchKycClientListSuccess,
  fetchKycClientListFailure,
} from "./kycSlice";

export const fetchKycData =
  (clientId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchKycStart());

      // Fetch KYC Status (Flags for PAN, Address, Bank)
      const kycStatusResponse = await axiosInstance.get(
        ENDPOINTS.GET_CLIENT_KYC(clientId),
      );

      // Fetch Full Client Profile (Name, Email, Bank Details, etc.)
      const clientResponse = await axiosInstance.get(
        ENDPOINTS.CLIENT_BY_ID(clientId),
      );

      const kycData = {
        ...(kycStatusResponse.data.data?.client || {}),
        ...(clientResponse.data.data || {}),
      };

      // Ensure field compatibility with KycDone.tsx (Case-sensitive mapping)
      if (kycData) {
        kycData.Email = kycData.Email || kycData.email;
        kycData.mobileNo =
          kycData.mobileNo || kycData.mobileNumber || kycData.mobile;
      }

      const status = kycStatusResponse.data.data?.status || {
        pan: 0,
        address: 0,
        bank: 0,
      };

      dispatch(fetchKycSuccess({ kycData, status }));
    } catch (error: any) {
      console.error("Error fetching KYC data:", error);
      dispatch(
        fetchKycFailure(
          error.response?.data?.message || "Failed to fetch KYC data",
        ),
      );
    }
  };

export const savePanDetails =
  (clientId: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(savePanStart());
      const response = await axiosInstance.post(
        ENDPOINTS.GET_PAN_DETAILS(clientId),
        {
          nameAsPerPan: data.name,
          pan: data.PanNumber,
          email: data.email,
          dob: data.dob,
        },
      );
      console.log(response, "response");
      const responseData = response.data;
      if (responseData.error) {
        const errorMessage = responseData.message || "Invalid PAN details";
        dispatch(savePanFailure(errorMessage));
        throw new Error(errorMessage);
      }
      dispatch(savePanSuccess(data));
      return responseData;
    } catch (error: any) {
      console.error("Error saving PAN details:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to save PAN details";
      dispatch(savePanFailure(errorMessage));
      throw error;
    }
  };

export const saveAddressDetails =
  (clientId: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(saveAddressStart());
      const response = await axiosInstance.post(
        ENDPOINTS.GET_ADDRESS_DETAILS(clientId),
        {
          city: data.cityName || data.city,
          line1: data.address,
          state: data.stateName || data.state,
          statecode: String(data.stateCode || ""),
          zip: data.zip,
        },
      );
      const responseData = response.data;
      if (responseData.error) {
        const errorMessage =
          responseData.message || "Failed to save address details";
        dispatch(saveAddressFailure(errorMessage));
        throw new Error(errorMessage);
      }
      dispatch(saveAddressSuccess(data));
      return responseData;
    } catch (error: any) {
      console.error("Error saving address details:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to save address details";
      dispatch(saveAddressFailure(errorMessage));
      throw error;
    }
  };

export const saveBankDetails =
  (clientId: string, data: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(saveBankStart());

      const response = await axiosInstance.post(
        ENDPOINTS.GET_BANK_DETAILS(clientId),
        {
          BankAccount: data.bank_account_no,
          ifsc: data.ifsc_code,
        },
      );

      const responseData = response.data;

      // API returned error=true
      if (responseData.error === true) {
        dispatch(saveBankFailure(responseData.message));

        return {
          success: false,
          message: responseData.message,
        };
      }

      // API returned success
      dispatch(saveBankSuccess(data));

      return {
        success: true,
        message: responseData.message,
        data: responseData,
      };
    } catch (error: any) {
      console.error("Error saving bank details:", error);

      const errorMessage =
        error.response?.data?.message || "Failed to save bank details";

      dispatch(saveBankFailure(errorMessage));

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

export const fetchKycClientList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchKycClientListStart());
    const response = await axiosInstance.get(ENDPOINTS.KYC_CLIENT_LIST);
    if (response.data.error === false) {
      dispatch(fetchKycClientListSuccess(response.data.data));
    } else {
      dispatch(fetchKycClientListFailure(response.data.message));
    }
  } catch (error: any) {
    console.error("Error fetching KYC client list:", error);
    dispatch(
      fetchKycClientListFailure(
        error.response?.data?.message || "Failed to fetch client list",
      ),
    );
  }
};
