import axiosInstance from "../../services/axiosInstance";
import { ENDPOINTS } from "../../services/endpoints";
import type { AppDispatch } from "../../redux/store";
import {
  fetchCollateralsFailure,
  fetchCollateralsStart,
  fetchCollateralsSuccess,
  fetchTutorialsFailure,
  fetchTutorialsStart,
  fetchTutorialsSuccess,
  type CollateralItem,
  type YoutubePlaylistItem,
} from "./knowledgeSlice";

interface YoutubePlaylistResponse {
  items?: YoutubePlaylistItem[];
  nextPageToken?: string;
  error?: {
    message?: string;
  };
}

export const getKnowledgeCollaterals = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCollateralsStart());
    const { data } = await axiosInstance.get(ENDPOINTS.GET_COLATERAL);

    const collaterals = Array.isArray(data?.data)
      ? (data.data as CollateralItem[])
      : [];

    dispatch(fetchCollateralsSuccess(collaterals));
    return collaterals;
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch knowledge base collateral";
    dispatch(fetchCollateralsFailure(errorMsg));
    throw error;
  }
};

export const getKnowledgeTutorials = () => async (dispatch: AppDispatch) => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const playlistId = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;

  if (!apiKey || !playlistId) {
    dispatch(
      fetchTutorialsFailure("YouTube playlist configuration is missing"),
    );
    return [];
  }

  try {
    dispatch(fetchTutorialsStart());

    const allVideos: YoutubePlaylistItem[] = [];
    let nextPageToken = "";

    do {
      const query = new URLSearchParams({
        part: "snippet",
        playlistId,
        maxResults: "50",
        key: apiKey,
      });

      if (nextPageToken) {
        query.set("pageToken", nextPageToken);
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?${query.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch YouTube playlist");
      }

      const data = (await response.json()) as YoutubePlaylistResponse;

      if (data.error?.message) {
        throw new Error(data.error.message);
      }

      if (Array.isArray(data.items)) {
        allVideos.push(...data.items);
      }

      nextPageToken = data.nextPageToken || "";
    } while (nextPageToken);

    dispatch(fetchTutorialsSuccess(allVideos));
    return allVideos;
  } catch (error: any) {
    const errorMsg = error?.message || "Failed to fetch tutorial videos";
    dispatch(fetchTutorialsFailure(errorMsg));
    throw error;
  }
};
