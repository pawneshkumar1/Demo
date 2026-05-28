import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import { AppDispatch, RootState } from "../../redux/store";
import { decryptData } from "../../utils/encryptionHelper";
import {
  fetchTemplateStart,
  fetchTemplateSuccess,
  fetchTemplateFailure,
  TemplateData,
  GeneratedTemplate,
  fetchTemplateGalleryStart,
  fetchTemplateGallerySuccess,
  fetchTemplateGalleryFailure,
} from "./templateSlice";

export type TemplatePayload = TemplateData | FormData;

export const getTemplateData = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchTemplateStart());
    const { data } = await axiosInstance.get(
      ENDPOINTS.GET_PARTNER_TEMPLATE_DATA,
    );

    // Manual decryption fallback
    const finalData = data?.encrypted ? decryptData(data) : data;
    let templateData = finalData?.data || finalData;

    // Handle array response if needed (similar to profile)
    if (Array.isArray(templateData)) {
      templateData = templateData[0];
    }

    // Ensure state mapping matches TemplateData interface
    const mappedData: TemplateData = {
      name: templateData.name || "",
      profession: templateData.profession || "",
      logo: templateData.logo || "",
      photo: templateData.photo || "",
      mobile: templateData.mobile || "",
      email: templateData.email || "",
      address: templateData.address || "",
      companyName: templateData.companyName || "",
    };

    dispatch(fetchTemplateSuccess(mappedData));
    return mappedData;
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch template";
    dispatch(fetchTemplateFailure(errorMsg));
    throw error;
  }
};

export const getTemplateGallery =
  (skip: number, region: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(fetchTemplateGalleryStart({ skip }));

      if (skip === 0 && !getState().template.templateData) {
        await dispatch(getTemplateData() as any);
      }

      const { data } = await axiosInstance.get(ENDPOINTS.GET_TEMPLATE(skip, region));
      const finalData = data?.encrypted ? decryptData(data) : data;
      const templates = Array.isArray(finalData?.data)
        ? (finalData.data as GeneratedTemplate[])
        : [];

      dispatch(
        fetchTemplateGallerySuccess({
          templates,
          skip,
        }),
      );

      return templates;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch templates";
      dispatch(fetchTemplateGalleryFailure(errorMsg));
      throw error;
    }
  };

export const updateTemplateData =
  (payload: TemplatePayload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchTemplateStart());
      const { data } = await axiosInstance.post(
        ENDPOINTS.PARTNER_TEMPLATE_DATA,
        payload,
        payload instanceof FormData
          ? {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          : undefined,
      );

      const finalData = data?.encrypted ? decryptData(data) : data;
      let templateData = finalData?.data || finalData;

      if (Array.isArray(templateData)) {
        templateData = templateData[0];
      }

      const fallbackData =
        payload instanceof FormData
          ? {
              name: String(payload.get("name") || ""),
              profession: String(payload.get("profession") || ""),
              logo: String(payload.get("logo") || ""),
              photo: String(payload.get("photo") || ""),
              mobile: String(payload.get("mobile") || ""),
              email: String(payload.get("email") || ""),
              address: String(payload.get("address") || ""),
              companyName: String(payload.get("companyName") || ""),
            }
          : payload;

      const mappedData: TemplateData = {
        name: templateData.name || fallbackData.name,
        profession: templateData.profession || fallbackData.profession,
        logo: templateData.logo || fallbackData.logo,
        photo: templateData.photo || fallbackData.photo,
        mobile: templateData.mobile || fallbackData.mobile,
        email: templateData.email || fallbackData.email,
        address: templateData.address || fallbackData.address,
        companyName: templateData.companyName || fallbackData.companyName,
      };

      dispatch(fetchTemplateSuccess(mappedData));
      return mappedData;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to update template";
      dispatch(fetchTemplateFailure(errorMsg));
      throw error;
    }
  };
