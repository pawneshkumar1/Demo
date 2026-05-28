import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

export interface Client {
  _id: string;
  partner_id: string;
  partner_username: string;
  name: string;
  Email: string;
  mobileNo: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  PanNumber?: string;
  dob?: string;
  customerRefNo?: string;
  [key: string]: any;
}

interface ClientState {
  clientList: Client[];
  totalClients: number;
  loading: boolean;
  error: string | null;
  otpLoading: {
    emailSend: boolean;
    emailVerify: boolean;
    mobileSend: boolean;
    mobileVerify: boolean;
  };
  otpError: {
    emailSend: string | null;
    emailVerify: string | null;
    mobileSend: string | null;
    mobileVerify: string | null;
  };
  createLoading: boolean;
  createError: string | null;
  selectedClient: Client | null;
}

const initialState: ClientState = {
  clientList: [],
  totalClients: 0,
  loading: false,
  error: null,
  otpLoading: {
    emailSend: false,
    emailVerify: false,
    mobileSend: false,
    mobileVerify: false,
  },
  otpError: {
    emailSend: null,
    emailVerify: null,
    mobileSend: null,
    mobileVerify: null,
  },
  createLoading: false,
  createError: null,
  selectedClient: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    fetchClientsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchClientsSuccess: (
      state,
      action: PayloadAction<{ clients: Client[]; total: number }>,
    ) => {
      state.loading = false;
      state.clientList = action.payload.clients;
      state.totalClients = action.payload.total;
    },
    fetchClientsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Email OTP
    sendEmailOtpStart: (state) => {
      state.otpLoading.emailSend = true;
      state.otpError.emailSend = null;
    },
    sendEmailOtpSuccess: (state) => {
      state.otpLoading.emailSend = false;
    },
    sendEmailOtpFailure: (state, action: PayloadAction<string>) => {
      state.otpLoading.emailSend = false;
      state.otpError.emailSend = action.payload;
    },
    verifyEmailOtpStart: (state) => {
      state.otpLoading.emailVerify = true;
      state.otpError.emailVerify = null;
    },
    verifyEmailOtpSuccess: (state) => {
      state.otpLoading.emailVerify = false;
    },
    verifyEmailOtpFailure: (state, action: PayloadAction<string>) => {
      state.otpLoading.emailVerify = false;
      state.otpError.emailVerify = action.payload;
    },
    // Mobile OTP
    sendMobileOtpStart: (state) => {
      state.otpLoading.mobileSend = true;
      state.otpError.mobileSend = null;
    },
    sendMobileOtpSuccess: (state) => {
      state.otpLoading.mobileSend = false;
    },
    sendMobileOtpFailure: (state, action: PayloadAction<string>) => {
      state.otpLoading.mobileSend = false;
      state.otpError.mobileSend = action.payload;
    },
    verifyMobileOtpStart: (state) => {
      state.otpLoading.mobileVerify = true;
      state.otpError.mobileVerify = null;
    },
    verifyMobileOtpSuccess: (state) => {
      state.otpLoading.mobileVerify = false;
    },
    verifyMobileOtpFailure: (state, action: PayloadAction<string>) => {
      state.otpLoading.mobileVerify = false;
      state.otpError.mobileVerify = action.payload;
    },
    // Creating Client
    createClientStart: (state) => {
      state.createLoading = true;
      state.createError = null;
    },
    createClientSuccess: (state) => {
      state.createLoading = false;
    },
    createClientFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.createError = action.payload;
    },
    resetClientState: (state) => {
      state.otpError = initialState.otpError;
      state.otpLoading = initialState.otpLoading;
      state.createError = null;
      state.createLoading = false;
    },
    setSelectedClient: (state, action: PayloadAction<Client | null>) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Clear state on logout
    builder.addCase(logout, () => initialState);
  },
});

export const {
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsFailure,
  sendEmailOtpStart,
  sendEmailOtpSuccess,
  sendEmailOtpFailure,
  verifyEmailOtpStart,
  verifyEmailOtpSuccess,
  verifyEmailOtpFailure,
  sendMobileOtpStart,
  sendMobileOtpSuccess,
  sendMobileOtpFailure,
  verifyMobileOtpStart,
  verifyMobileOtpSuccess,
  verifyMobileOtpFailure,
  createClientStart,
  createClientSuccess,
  createClientFailure,
  resetClientState,
  setSelectedClient,
} = clientSlice.actions;

export default clientSlice.reducer;
