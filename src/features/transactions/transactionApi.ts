import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  sendPdfStart,
  sendPdfSuccess,
  sendPdfFailure,
} from "./transactionSlice";
import { formatToISO } from "../../utils/queryParam";

export const fetchTransactionReport =
  (clientId: string, startDate: string, endDate: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchTransactionsStart());
    try {
      const queryParams = new URLSearchParams({
        startDate: formatToISO(startDate),
        endDate: formatToISO(endDate),
      });
      const url = ENDPOINTS.GET_TRANSACTION_REPORT(clientId, queryParams);
      const response = await axiosInstance.get(url);
      if (response.data.error === false) {
        dispatch(fetchTransactionsSuccess(response.data.data));
      } else {
        dispatch(fetchTransactionsFailure(response.data.message));
      }
    } catch (error: any) {
      dispatch(
        fetchTransactionsFailure(
          error.message || "Failed to fetch transactions",
        ),
      );
    }
  };

export const sendTransactionPdf =
  (clientId: string, pdfBlob: Blob, startDate: string, endDate: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(sendPdfStart());
    try {
      const formData = new FormData();
      formData.append("file", pdfBlob, "Transaction_Report.pdf");
      formData.append("startDate", formatToISO(startDate));
      formData.append("endDate", formatToISO(endDate));

      const url = ENDPOINTS.SEND_TRANSACTION_MAIL(clientId);
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.error === false) {
        dispatch(sendPdfSuccess());
        return { success: true, message: response.data.message };
      } else {
        dispatch(sendPdfFailure(response.data.message));
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      dispatch(sendPdfFailure(error.message || "Failed to send PDF"));
      return { success: false, message: error.message };
    }
  };
