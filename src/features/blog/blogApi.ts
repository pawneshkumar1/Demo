import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import { AppDispatch } from "../../redux/store";
import {
  blogStart,
  getBlogListSuccess,
  getCategoryListSuccess,
  getBlogDetailsSuccess,
  blogFailure,
} from "./blogSlice";

export const fetchBlogList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(blogStart());
    const { data } = await axiosInstance.get(ENDPOINTS.BLOG_POST_LIST);
    if (data.error) {
      dispatch(blogFailure(data.message || "Failed to fetch blogs"));
    } else {
      dispatch(getBlogListSuccess(data.data));
    }
  } catch (error: any) {
    dispatch(blogFailure(error.response?.data?.message || "Failed to fetch blogs"));
  }
};

export const fetchCategoryList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(blogStart());
    const { data } = await axiosInstance.get(ENDPOINTS.BLOG_CATEGORY_LIST);
    if (data.error) {
      dispatch(blogFailure(data.message || "Failed to fetch categories"));
    } else {
      dispatch(getCategoryListSuccess(data.data));
    }
  } catch (error: any) {
    dispatch(blogFailure(error.response?.data?.message || "Failed to fetch categories"));
  }
};

export const fetchBlogDetails = (titleUrl: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(blogStart());
    const { data } = await axiosInstance.get(ENDPOINTS.BLOG_DETAILS(titleUrl));
    if (data.error) {
      dispatch(blogFailure(data.message || "Failed to fetch blog details"));
    } else {
      // API returns an array of details, usually we want the first one
      dispatch(getBlogDetailsSuccess(data.data[0]));
    }
  } catch (error: any) {
    dispatch(blogFailure(error.response?.data?.message || "Failed to fetch blog details"));
  }
};
