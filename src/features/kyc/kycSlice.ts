import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface KycData {
  PanNumber?: string;
  dob?: string;
  email?: string;
  Email?: string;
  name?: string;
  mobileNumber?: string;
  mobileNo?: string;
  address?: string;
  state?: string;
  stateName?: string;
  stateCode?: string;
  city?: string;
  cityName?: string;
  zip?: string;
  accountHolderName?: string;
  bank_account_name?: string;
  bank_account_no?: string;
  confirmAccountNo?: string;
  ifsc_code?: string;
}

interface KycStatus {
  pan: number;
  address: number;
  bank: number;
}

interface KycState {
  selectedClientId: string | null;
  kycData: KycData;
  status: KycStatus;
  loading: boolean;
  error: string | null;
  panLoading: boolean;
  addressLoading: boolean;
  bankLoading: boolean;
  kycClientList: any[];
}

const initialState: KycState = {
  selectedClientId: null,
  kycData: {},
  status: { pan: 0, address: 0, bank: 0 },
  loading: false,
  error: null,
  panLoading: false,
  addressLoading: false,
  bankLoading: false,
  kycClientList: [],
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    setSelectedClientId: (state, action: PayloadAction<string | null>) => {
      state.selectedClientId = action.payload;
    },
    fetchKycStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchKycSuccess: (state, action: PayloadAction<{ kycData: KycData; status: KycStatus }>) => {
      state.loading = false;
      state.kycData = action.payload.kycData;
      state.status = action.payload.status;
    },
    fetchKycFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    savePanStart: (state) => {
      state.panLoading = true;
      state.error = null;
    },
    savePanSuccess: (state, action: PayloadAction<Partial<KycData>>) => {
      state.panLoading = false;
      state.kycData = { ...state.kycData, ...action.payload };
      state.status.pan = 1;
    },
    savePanFailure: (state, action: PayloadAction<string>) => {
      state.panLoading = false;
      state.error = action.payload;
    },
    saveAddressStart: (state) => {
      state.addressLoading = true;
      state.error = null;
    },
    saveAddressSuccess: (state, action: PayloadAction<Partial<KycData>>) => {
      state.addressLoading = false;
      state.kycData = { ...state.kycData, ...action.payload };
      state.status.address = 1;
    },
    saveAddressFailure: (state, action: PayloadAction<string>) => {
      state.addressLoading = false;
      state.error = action.payload;
    },
    saveBankStart: (state) => {
      state.bankLoading = true;
      state.error = null;
    },
    saveBankSuccess: (state, action: PayloadAction<Partial<KycData>>) => {
      state.bankLoading = false;
      state.kycData = { ...state.kycData, ...action.payload };
      state.status.bank = 1;
    },
    saveBankFailure: (state, action: PayloadAction<string>) => {
      state.bankLoading = false;
      state.error = action.payload;
    },
    fetchKycClientListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchKycClientListSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.kycClientList = action.payload;
    },
    fetchKycClientListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetKycState: () => initialState,
  },
});

export const {
  setSelectedClientId,
  fetchKycStart,
  fetchKycSuccess,
  fetchKycFailure,
  savePanStart,
  savePanSuccess,
  savePanFailure,
  saveAddressStart,
  saveAddressSuccess,
  saveAddressFailure,
  saveBankStart,
  saveBankSuccess,
  saveBankFailure,
  fetchKycClientListStart,
  fetchKycClientListSuccess,
  fetchKycClientListFailure,
  resetKycState,
} = kycSlice.actions;

export default kycSlice.reducer;
