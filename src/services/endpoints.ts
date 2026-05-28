export const ENDPOINTS = {
  //==============Master=================
  GET_STATE_CODE: "/stateCode/getstateCode",
  GET_CITIES_OF_STATE: "/stateCode/getCitiesOfState",
  //==============Authentication=================
  LOGIN: "/api/partner/login", //done
  LOGOUT: "/api/partner/logout", //done
  FORGOT_PASSWORD: "/api/partner/password-forget", //done
  //==============Registration=================
  PARTNER_REGISTRATION: "/api/partner/register", //done
  SEND_OTP_REGISTERATION: "/api/partner/send-otp", //done
  //===========Header=================
  CREATE_DYNAMIC_LINK: "/api/partner/qr/getOrCreate",
  LIVE_PRICE: "/augmont/mmtc/liveprice",
  //=========Profile=================
  PROFILE: "/api/partner/profile", //done
  BANK_UPDATE: "/api/partner/bank-update", //not done
  PROFILE_UPDATE: "/api/partner/profile-update",
  GET_PARTNER_TEMPLATE_DATA: "/partnerPortal/getPartnerTemplateData",
  PARTNER_TEMPLATE_DATA: "/partnerPortal/partnerTemplateData",
  PROFILE_PASSWORD_CHANGE: "/api/partner/password-change", //done
  //==============Dashboard=================
  // GET_TOTAL_INVESTMENTS: "/api/partner/get-total-investments",
  GRAPH_DATA: (queryParam: string) => `/api/partner/graph-data${queryParam}`,
  TOP_INVESTERS: "/api/partner/top-investers",
  //==============Investors=================
  CLIENT_LIST: "/api/partner/client-list", //done
  CLIENT_CREATE: "/api/partner/client-create", //done
  SEND_EMAIL_OTP: "/api/partner/email-otp", // done
  VERIFY_EMAIL_OTP: "/api/partner/verifyEmail", // done
  SEND_MOBILE_OTP: "/api/partner/send-mobile-otp", // done
  VERIFY_MOBILE_OTP: "/api/partner/verify-mobile", // done
  CLIENT_UPDATE: (clientId) => `/api/partner/client-update/${clientId}`,
  //===============KYC=================
  GET_CLIENT_KYC: (clientId) => `/clientById/${clientId}`,
  KYC_CLIENT_LIST: "/kycClientList",
  GET_PAN_DETAILS: (clientId) => `/api/partners/pan/save/${clientId}`, //done
  GET_ADDRESS_DETAILS: (clientId) => `/api/partners/address/save/${clientId}`, //done
  GET_BANK_DETAILS: (clientId) => `/api/partners/bank/save/${clientId}`, //done
  //=================TRANSACTION REPORT=================
  GET_TRANSACTION_REPORT: (clientId, queryParams) =>
    `/partnerPortal/userReports/${clientId}?${queryParams.toString()}`,
  SEND_TRANSACTION_MAIL: (clientId) =>
    `/partnerPortal/userReports/sendMail/${clientId}`,
  //=================SIP=================
  GET_SIP_STATUS: (sipStatus: string) => `/partnerPortal/sip/${sipStatus}`,
  CREATE_SIP_PROPOSAL: (clientId: string) =>
    `/partnerPortal/sip/proposal/create/${clientId}`,
  // ======================================
  SEND_OTP: "/api/partner/send-email-otp",
  VERIFY_OTP: "/api/partner/verify-email-otp",
  CLIENT_BY_ID: (clientId) => `/api/partner/get-client/${clientId}`, //done
  // SIP=============
  SIP_IN_PROGRESS: "/api/partner/sip/list?status=in-progress", //done
  SIP_EXECUTED: "/api/partner/sip/list?status=executed", //done
  SIP_EXPIRED: "/api/partner/sip/list?status=expired", //done
  SIP_DELETE: (_id) => `/api/partner/sip/proposal-delete/${_id}`, //done
  SIP_CANCEL: (subReferenceId) =>
    `/api/partner/sip/proposal-cancel/${subReferenceId}`, //done
  SIP_CREATE: (clientId) => `/api/partner/sip/proposal-create/${clientId}`, //done
  // =========================================
  // KYC_CLIENT_LIST: "/api/partner/kyc-client-list", //not done
  LIVE_PRICE_GOLD: "/api/partner/live-price/gold",
  LIVE_PRICE_SILVER: "/api/partner/live-price/silver",

  //=======================Buy Gold/Silver==================
  GET_PORTFOLIO: (clientId: string) => `/api/partner/getportfolio/${clientId}`,
  PROPOSAL_CREATE: (clientId: string) =>
    `/api/partner/buy/proposal-create/${clientId}`, //not done
  PROPOSAL_LINK: (proposalId: string) =>
    `/api/partner/buy/proposal-link/${proposalId}`, //not done
  DELETE_PROPOSAL: (_id) => `/api/partner/buy/proposal-delete/${_id}`, //done
  GET_PROPOSAL: "/api/partner/buy/proposal-get", //done

  // buy sell==========
  CREATE_BUY_PROPOSAL: (clientId: string) => `/proposal_create/${clientId}`,
  GET_BUY_PROPOSALS: (status: string) => `/getProposal?status=${status}`,
  GET_SELL_ORDERS: "/partnerPortal/sellOrderList",
  UPDATE_PROPOSAL: (_id) => `/api/partner/proposalUpdate/${_id}`,
  MMTC_LIVE_PRICE: "/api/partner/mmtc-live-price",
  MMTC_SELL_LIVE_PRICE: "/partnerPortal/mmtc/livePrice",
  AUGMONT_SELL_LIVE_PRICE: (metal: string) => `/sellliveprice/${metal}`,
  SELL_ORDER_LIST: "/api/partner/sell/proposal-list",
  SELL_PROPOSAL_CREATE: (clientId: string) =>
    `/api/partner/sell/proposal-create/${clientId}`,
  CREATE_SELL_ORDER: (clientId: string) => `/partnerPortal/sell/${clientId}`,
  DELETE_SELL_PROPOSAL: (_id) => `/api/partner/sell/proposal-delete/${_id}`,
  RESEND_SELL_PROPOSAL: (orderNo) =>
    `/api/partner/sell/proposal-resend/${orderNo}`,
  // JEWELLERY=========
  PRODUCT_SUB_CATEGORY: "/emi/partner_portal/productSubCategory",
  GET_ORDER_SUMMARY: "/api/partner/merchant/order-get",
  GET_JEWELLERY_ORDERS: "/emi/partner_portal/getOrderSummary",
  CANCEL_ORDER: (MerchantOrder_id) =>
    `/api/partner/cancelOrder/${MerchantOrder_id}`,
  CANCEL_MERCHANT_ORDER: (selectedOrderId) =>
    `/api/partner/cancelMerchantOrder/${selectedOrderId}`,
  // EARNING=========
  GET_PARTNER_INVESTMENTS: (queryParams) =>
    `/getPartnerInvestments?${queryParams.toString()}`,
  // SALES=========
  GET_TOTAL_INVESTMENTS: "/getTotalInvestments",
  GET_PARTNER_COMMISSIONS: (monthIndex, selectedYear) =>
    `/api/partner/get-partner-commissions?month=${monthIndex}&year=${selectedYear}`,
  GENERATE_INVOICE: "/api/partner/generate-invoice-partner",
  GET_PARTNER_TOTAL_COMMISSIONS: (month: string, year: string) =>
    `/partnerPortal/getPartnerWithTotalCommissions?month=${month}&year=${year}`,
  GENERATE_PARTNER_INVOICE: "/partnerPortal/generateInvoiceOfPartner",
  GET_PARTNER_TEMPLATE: "/api/partner/template-data",
  GET_TEMPLATE: (skip, region) =>
    `/partnerPortal/getTemplate?skip=${skip}&region=${region}`,
  GET_COLATERAL: "/api/partner/get-collateral",
  // REPORT=========
  GET_LUMP_SUM_REPORT: (queryParams) =>
    `/api/partner/report/lumpsum?${queryParams.toString()}`,
  GET_SIP_BOOKED_REPORT: (queryParams) =>
    `/api/partner/report/sip-booked?${queryParams.toString()}`,
  GET_SIP_REPORT: (queryParams) =>
    `/api/partner/report/sip?${queryParams.toString()}`,
  GET_MOBILE_SIP_REPORT: (queryParams) =>
    `/api/partner/report/mobileSIP?${queryParams.toString()}`,
  GET_SIP_BUSINESS_REPORT: (queryParams) =>
    `/api/partner/report/sip-business-report?${queryParams.toString()}`,
  GET_SIP_COMPLIANCE_REPORT: (queryParams) =>
    `/api/partner/report/compliance?${queryParams.toString()}`,
  GET_INACTIVE_CLIENT_REPORT: (queryParams) =>
    `/api/partner/report/inactive-client?${queryParams.toString()}`,
  GET_MISSING_SIP_REPORT: (queryParams) =>
    `/api/partner/report/sip-missing?${queryParams.toString()}`,
  // ADDRESS DETAILS=========
  CREATE_ORDER: (clientId) => `/api/partner/merchant/order/create/${clientId}`,
  // KYC============

  EMPLOYEE_LIST: "/api/partner/employee-list",
  EMPLOYEE_UPDATE: (employeeId) => `/api/partner/employee-update/${employeeId}`,
  EMPLOYEE_DELETE: (employeeId) => `/api/partner/employee-delete/${employeeId}`,
  EMPLOYEE_CREATE: "/api/partner/employee-create",

  // ======================================
  GET_PRODUCT: (id) => `/emi/partner_portal/product/${id}`,
  LIVE_PRICE_BY_ID: (id) => `/api/partner/live-price/${id}`,
  SELL_LIVE_PRICE: (id) => `/api/partner/sell-live-price/${id}`,
  // FAQ===========
  GET_FAQS: "/admin_panel/faq/both",
  // POLICIES===========
  GET_POLICY: (type: string) => `/admin_panel/policy/get/${type}`,

  // BLOG===========
  BLOG_POST_LIST: "/admin_panel/blog_PostList",
  BLOG_CATEGORY_LIST: "/admin_panel/category_List",
  BLOG_DETAILS: (titleUrl: string) => `/admin_panel/blog_Details/${titleUrl}`,
};
