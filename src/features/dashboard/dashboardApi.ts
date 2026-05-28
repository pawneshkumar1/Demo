import { AppDispatch } from "../../redux/store";
import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import {
  fetchTotalInvestmentsStart,
  fetchTotalInvestmentsSuccess,
  fetchTopInvestorsStart,
  fetchTopInvestorsSuccess,
  fetchGraphDataStart,
  fetchGraphDataSuccess,
  fetchDashboardFailure,
} from "./dashboardSlice";

export const fetchTotalInvestments =
  (startDate: string, endDate: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchTotalInvestmentsStart());
      const { data } = await axiosInstance.get(ENDPOINTS.GET_TOTAL_INVESTMENTS, {
        params: { startDate, endDate },
      });

      if (data?.error === true) {
        throw new Error(data.message || "Failed to fetch total investments");
      }

      dispatch(fetchTotalInvestmentsSuccess(data.data));
    } catch (error: any) {
      dispatch(
        fetchDashboardFailure(
          error.message || "An error occurred while fetching total investments",
        ),
      );
    }
  };

export const fetchTopInvestors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchTopInvestorsStart());
    const { data } = await axiosInstance.get(ENDPOINTS.TOP_INVESTERS);

    if (data?.error === true) {
      throw new Error(data.message || "Failed to fetch top investors");
    }

    const investors = data.data.topClients.map((investor: any, index: number) => ({
      slno: index + 1,
      name: investor.clientDetails?.name || "Unknown",
      mobileNo: investor.clientDetails?.mobileNo || "N/A",
      Email: investor.clientDetails?.Email || "N/A",
      totalInvestment: investor.totalInvestment || 0,
    }));

    dispatch(fetchTopInvestorsSuccess(investors));
  } catch (error: any) {
    dispatch(
      fetchDashboardFailure(
        error.message || "An error occurred while fetching top investors",
      ),
    );
  }
};

export const fetchGraphData =
  (queryParam: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchGraphDataStart());
      const { data } = await axiosInstance.get(ENDPOINTS.GRAPH_DATA(queryParam));

      if (data?.error === true) {
        throw new Error(data.message || "Failed to fetch graph data");
      }

      const processedData = data.data.map((item: any) => ({
        month: item.month,
        gold: item.totalGold,
        silver: item.totalSilver,
        goldInRupees: parseFloat(item.totalGoldAmount),
        silverInRupees: parseFloat(item.totalSilverAmount),
        year: item.year,
      }));

      dispatch(fetchGraphDataSuccess(processedData));
    } catch (error: any) {
      dispatch(
        fetchDashboardFailure(
          error.message || "An error occurred while fetching graph data",
        ),
      );
    }
  };
