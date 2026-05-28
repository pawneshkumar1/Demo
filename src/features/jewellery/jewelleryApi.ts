import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import {
  fetchJewelleryStart,
  fetchJewellerySuccess,
  fetchJewelleryFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetailStart,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  setSelectedClient,
} from "./jewellerySlice";

export const fetchJewelleryOrders =
  () => async (dispatch: AppDispatch) => {
    dispatch(fetchJewelleryStart());
    try {
      const response = await axiosInstance.get(ENDPOINTS.GET_JEWELLERY_ORDERS);
      if (response.data.error === false || !response.data.error) {
        const d = response.data.data || {};
        dispatch(fetchJewellerySuccess(d));
      } else {
        dispatch(
          fetchJewelleryFailure(
            response.data.message || "Failed to fetch jewellery orders",
          ),
        );
      }
    } catch (error: any) {
      dispatch(
        fetchJewelleryFailure(
          error.response?.data?.message || "Failed to fetch jewellery orders",
        ),
      );
    }
  };

export const createJewelleryOrder =
  (clientId: string, payload: any, clientData?: any) => async (dispatch: AppDispatch) => {
    dispatch(createOrderStart());
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.CREATE_ORDER(clientId),
        payload,
      );
      if (response.data.error === false || !response.data.error) {
        dispatch(createOrderSuccess());
        return { success: true, data: response.data.data };
      } else {
        const errorMessage = response.data.message || "Failed to create order";
        dispatch(createOrderFailure(errorMessage));
        return { success: false, error: errorMessage };
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create order";
      dispatch(createOrderFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

export const fetchProductDetail = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchProductDetailStart());
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_PRODUCT(id));
    if (response.data.error === false || !response.data.error) {
      dispatch(fetchProductDetailSuccess(response.data.data));
    } else {
      dispatch(
        fetchProductDetailFailure(
          response.data.message || "Failed to fetch product details",
        ),
      );
    }
  } catch (error: any) {
    dispatch(
      fetchProductDetailFailure(
        error.response?.data?.message || "Failed to fetch product details",
      ),
    );
  }
};

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axiosInstance.get(ENDPOINTS.PRODUCT_SUB_CATEGORY);
    if (response.data.error === false || !response.data.error) {
      const d = response.data.data?.data || response.data.data || [];
      dispatch(fetchProductsSuccess(d));
    } else {
      dispatch(
        fetchProductsFailure(
          response.data.message || "Failed to fetch products",
        ),
      );
    }
  } catch (error: any) {
    dispatch(
      fetchProductsFailure(
        error.response?.data?.message || "Failed to fetch products",
      ),
    );
  }
};

export const fetchClientById = (clientId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.CLIENT_BY_ID(clientId));
    if (response.data.error === false || !response.data.error) {
      dispatch(setSelectedClient(response.data.data || null));
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch client");
    }
  } catch (error: any) {
    throw error;
  }
};
