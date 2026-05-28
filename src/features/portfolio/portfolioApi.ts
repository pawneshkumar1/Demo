import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import {
  fetchPortfolioStart,
  fetchPortfolioSuccess,
  fetchProviderPortfolioSuccess,
  fetchPortfolioFailure,
  PortfolioData,
} from "./portfolioSlice";

const parseMetal = (metal: any) => ({
  investedAmount: parseFloat(metal?.investedAmount || "0"),
  currentAmount: parseFloat(metal?.currentAmount || "0"),
  profitORloss: parseFloat(metal?.profitORloss || "0"),
  percent: parseFloat(metal?.percent || "0"),
  available: parseFloat(metal?.balQuantity || "0"),
  locked: parseFloat(metal?.lockedQuantity || "0"),
});

export const fetchPortfolio =
  (clientId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchPortfolioStart());
    try {
      console.log("🟣 Calling Unified Portfolio API for client:", clientId);
      const response = await axiosInstance.get(
        ENDPOINTS.GET_PORTFOLIO(clientId),
      );
      console.log("🟣 Unified Portfolio Response:", response);
      
      const rawData = response.data?.data || response.data;
      const resData = Array.isArray(rawData) ? rawData[0] : rawData;
      console.log("🟣 Unified Portfolio Data Parsed:", resData);

      const data: PortfolioData = {
        customerRefNo: resData?.customerRefNo || "",
        augmont: {
          gold: parseMetal(resData?.augmont?.gold),
          silver: parseMetal(resData?.augmont?.silver),
        },
        mmtc: {
          gold: parseMetal(resData?.mmtc?.gold),
          silver: parseMetal(resData?.mmtc?.silver),
        },
      };
      console.log("🟣 Unified Portfolio Final State Data:", data);
      dispatch(fetchPortfolioSuccess(data));
    } catch (error: any) {
      console.error(
        "Unified Portfolio fetch error:",
        error.response?.data || error,
      );
      dispatch(
        fetchPortfolioFailure(
          error.response?.data?.message || "Failed to fetch unified portfolio",
        ),
      );
    }
  };

export const fetchUnifiedPortfolio = fetchPortfolio;
