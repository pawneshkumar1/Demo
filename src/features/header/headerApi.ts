import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchQrStart,
  fetchQrSuccess,
  fetchQrFailure,
  fetchPricesStart,
  fetchPricesSuccess,
  fetchPricesFailure,
  HeaderPriceItem,
} from "./headerSlice";

const getNestedValue = (source: any, paths: string[][]) => {
  for (const path of paths) {
    let current = source;
    let found = true;

    for (const key of path) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        found = false;
        break;
      }
    }

    if (found && typeof current === "string" && current.trim()) {
      return current.trim();
    }
  }

  return "";
};

export const fetchQrCode =
  (partnerUsername?: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(fetchQrStart());
      const userName = partnerUsername || getState().user.profile?.userName;

      console.log(userName, ">>>>>user name >>>>>>>>>");

      if (!userName) {
        throw new Error("Partner username is unavailable");
      }

      const { data } = await axiosInstance.post(ENDPOINTS.CREATE_DYNAMIC_LINK, {
        partnerUsername: userName,
      });

      if (data?.auth === false) {
        throw new Error("Session expired. Please login again.");
      }

      let finalQrUrl = data?.Qrbuffer;
      await dispatch(fetchQrSuccess({ url: finalQrUrl, value: data }));
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load QR code";
      dispatch(fetchQrFailure(errorMsg));
      throw error;
    }
  };

export const fetchHeaderPrices = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchPricesStart());

    const { data } = await axiosInstance.get(ENDPOINTS.LIVE_PRICE);

    if (data?.auth === false) {
      throw new Error("Session expired. Please login again.");
    }

    const payload = data?.data;
    if (!payload) {
      throw new Error("Live price data unavailable");
    }

    const augmont = payload?.augmont_live_price;
    const mmtc = payload?.mmtc_live_price;

    const prices: HeaderPriceItem[] = [
      {
        provider: "Augmont",
        gold: augmont?.gold || "0.00",
        silver: augmont?.silver || "0.00",
        goldTrend: {
          change: augmont?.gold_percentage?.change || "0.00",
          direction:
            augmont?.gold_percentage?.type === "decrease"
              ? "down"
              : augmont?.gold_percentage?.type === "increase"
                ? "up"
                : "none",
        },
        silverTrend: {
          change: augmont?.silver_percentage?.change || "0.00",
          direction:
            augmont?.silver_percentage?.type === "decrease"
              ? "down"
              : augmont?.silver_percentage?.type === "increase"
                ? "up"
                : "none",
        },
      },
      {
        provider: "MMTC-PAMP",
        gold: mmtc?.gold || "0.00",
        silver: mmtc?.silver || "0.00",
        goldTrend: { change: "0.00", direction: "none" },
        silverTrend: { change: "0.00", direction: "none" },
      },
    ];

    dispatch(fetchPricesSuccess(prices));
    return prices;
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch live prices";
    dispatch(fetchPricesFailure(errorMsg));
    throw error;
  }
};
