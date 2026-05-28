import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JewelleryState {
  jewelleryOrders: {
    PendingOrder: any[];
    ExecutedOrder: any[];
    CancelledOrder: any[];
  };
  products: any[];
  productsLoading: boolean;
  productsError: string | null;
  selectedProduct: any | null;
  productDetailLoading: boolean;
  productDetailError: string | null;
  loading: boolean;
  error: string | null;
  orderLoading: boolean;
  orderError: string | null;
  orderSuccess: boolean;
  selectedClient: any | null;
}

const initialState: JewelleryState = {
  jewelleryOrders: {
    PendingOrder: [],
    ExecutedOrder: [],
    CancelledOrder: [],
  },
  products: [],
  productsLoading: false,
  productsError: null,
  selectedProduct: null,
  productDetailLoading: false,
  productDetailError: null,
  loading: false,
  error: null,
  orderLoading: false,
  orderError: null,
  orderSuccess: false,
  selectedClient: null,
};

const jewellerySlice = createSlice({
  name: "jewellery",
  initialState,
  reducers: {
    fetchJewelleryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJewellerySuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.jewelleryOrders = {
        PendingOrder: action.payload.PendingOrder || [],
        ExecutedOrder: action.payload.ExecutedOrder || [],
        CancelledOrder: action.payload.CancelledOrder || [],
      };
    },
    fetchJewelleryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Products
    fetchProductsStart: (state) => {
      state.productsLoading = true;
      state.productsError = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<any[]>) => {
      state.productsLoading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.productsLoading = false;
      state.productsError = action.payload;
    },
    // Product Detail
    fetchProductDetailStart: (state) => {
      state.productDetailLoading = true;
      state.productDetailError = null;
    },
    fetchProductDetailSuccess: (state, action: PayloadAction<any>) => {
      state.productDetailLoading = false;
      state.selectedProduct = action.payload;
    },
    fetchProductDetailFailure: (state, action: PayloadAction<string>) => {
      state.productDetailLoading = false;
      state.productDetailError = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.productDetailError = null;
    },
    // Order Creation
    createOrderStart: (state) => {
      state.orderLoading = true;
      state.orderError = null;
      state.orderSuccess = false;
    },
    createOrderSuccess: (state) => {
      state.orderLoading = false;
      state.orderSuccess = true;
    },
    createOrderFailure: (state, action: PayloadAction<string>) => {
      state.orderLoading = false;
      state.orderError = action.payload;
    },
    resetOrderState: (state) => {
      state.orderLoading = false;
      state.orderError = null;
      state.orderSuccess = false;
    },
    setSelectedClient: (state, action: PayloadAction<any | null>) => {
      state.selectedClient = action.payload;
    },
  },
});

export const {
  fetchJewelleryStart,
  fetchJewellerySuccess,
  fetchJewelleryFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetailStart,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
  clearSelectedProduct,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  resetOrderState,
  setSelectedClient,
} = jewellerySlice.actions;

export default jewellerySlice.reducer;
