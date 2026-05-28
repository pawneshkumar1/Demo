import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import { AppDispatch } from "../../redux/store";
import {
  fetchFaqsStart,
  fetchFaqsSuccess,
  fetchFaqsFailure,
  FaqCategory,
  FaqQuestion,
} from "./faqSlice";

/**
 * Fetch all FAQs grouped by category
 */
export const getFaqs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchFaqsStart());

    const { data } = await axiosInstance.get(ENDPOINTS.GET_FAQS);

    if (data && !data.error) {
      // Transform flat FAQ array into grouped categories
      const faqsArray: any[] = data.data || [];
      const groupedFaqs = groupFaqsByCategory(faqsArray);

      dispatch(fetchFaqsSuccess(groupedFaqs));

      return groupedFaqs;
    } else {
      throw new Error(data?.message || "Failed to fetch FAQs");
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch FAQs";

    dispatch(fetchFaqsFailure(errorMessage));
    throw error;
  }
};

/**
 * Group flat FAQ array by category
 */
const groupFaqsByCategory = (faqArray: any[]): FaqCategory[] => {
  try {
    const grouped: { [key: string]: FaqQuestion[] } = {};

    faqArray.forEach((faq) => {
      // Handle different property names for question and answer
      const question = faq.q || faq.question || faq.title || "";
      const answer = faq.a || faq.answer || faq.description || "";
      const category = faq.category || faq.type || "General";

      if (!grouped[category]) {
        grouped[category] = [];
      }

      if (question && answer) {
        grouped[category].push({
          q: question,
          a: answer,
        });
      }
    });

    // Convert to array format expected by component
    return Object.entries(grouped).map(([category, questions]) => ({
      category,
      questions,
    }));
  } catch (error) {
    console.error("Error grouping FAQs by category:", error);
    throw error;
  }
};
