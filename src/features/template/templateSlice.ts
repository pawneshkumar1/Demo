import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

export interface TemplateData {
  name: string;
  profession: string;
  logo: string;
  photo: string;
  mobile: string;
  email: string;
  address: string;
  companyName: string;
}

export interface GeneratedTemplate {
  description: string;
  title: string;
  imagePath: string;
}

interface TemplateState {
  templateData: TemplateData | null;
  loading: boolean;
  error: string | null;
  templates: GeneratedTemplate[];
  templatesLoading: boolean;
  templatesError: string | null;
  hasMoreTemplates: boolean;
}

const initialState: TemplateState = {
  templateData: null,
  loading: false,
  error: null,
  templates: [],
  templatesLoading: false,
  templatesError: null,
  hasMoreTemplates: true,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    fetchTemplateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTemplateSuccess: (state, action: PayloadAction<TemplateData>) => {
      state.loading = false;
      state.templateData = action.payload;
    },
    fetchTemplateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTemplateGalleryStart: (state, action: PayloadAction<{ skip: number }>) => {
      state.templatesLoading = true;
      state.templatesError = null;

      if (action.payload.skip === 0) {
        state.templates = [];
        state.hasMoreTemplates = true;
      }
    },
    fetchTemplateGallerySuccess: (
      state,
      action: PayloadAction<{
        templates: GeneratedTemplate[];
        skip: number;
      }>,
    ) => {
      state.templatesLoading = false;
      state.templates =
        action.payload.skip === 0
          ? action.payload.templates
          : [...state.templates, ...action.payload.templates];
      state.hasMoreTemplates = action.payload.templates.length > 0;
    },
    fetchTemplateGalleryFailure: (state, action: PayloadAction<string>) => {
      state.templatesLoading = false;
      state.templatesError = action.payload;
    },
    resetTemplateGallery: (state) => {
      state.templates = [];
      state.templatesLoading = false;
      state.templatesError = null;
      state.hasMoreTemplates = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  fetchTemplateStart,
  fetchTemplateSuccess,
  fetchTemplateFailure,
  fetchTemplateGalleryStart,
  fetchTemplateGallerySuccess,
  fetchTemplateGalleryFailure,
  resetTemplateGallery,
} = templateSlice.actions;

export default templateSlice.reducer;
