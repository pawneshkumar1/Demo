import { AppDispatch } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";
import axiosInstance from "../../services/axiosInstance";
import {
  fetchInvoiceStart,
  fetchInvoiceSuccess,
  fetchInvoiceFailure,
  generateInvoiceStart,
  generateInvoiceSuccess,
  generateInvoiceFailure,
  GeneratedInvoice,
  PartnerCommissionSummary,
} from "./invoiceSlice";

export const fetchInvoiceReport =
  (month: string, year: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchInvoiceStart());

      const response = await axiosInstance.get(
        ENDPOINTS.GET_PARTNER_TOTAL_COMMISSIONS(month, year),
      );

      if (response.data?.error === false) {
        const responseData = response.data?.data ?? {};
        const partner =
          (responseData.results?.[0] as PartnerCommissionSummary | undefined) ??
          null;
        const transactions = responseData.transactions ?? [];

        dispatch(fetchInvoiceSuccess({ partner, transactions }));
        return { success: true, data: responseData };
      }

      const message = response.data?.message || "Failed to fetch invoice data";
      dispatch(fetchInvoiceFailure(message));
      return { success: false, message };
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to fetch invoice data";
      dispatch(fetchInvoiceFailure(message));
      return { success: false, message };
    }
  };

export const generatePartnerInvoice =
  (payload: Record<string, unknown>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(generateInvoiceStart());

      const response = await axiosInstance.post(
        ENDPOINTS.GENERATE_PARTNER_INVOICE,
        payload,
      );

      if (response.data?.error === false) {
        const invoiceData = (response.data?.data ?? null) as GeneratedInvoice;
        dispatch(generateInvoiceSuccess(invoiceData));
        return { success: true, data: invoiceData, message: response.data?.message };
      }

      const message = response.data?.message || "Failed to generate invoice";
      dispatch(generateInvoiceFailure(message));
      return { success: false, message };
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to generate invoice";
      dispatch(generateInvoiceFailure(message));
      return { success: false, message };
    }
  };
