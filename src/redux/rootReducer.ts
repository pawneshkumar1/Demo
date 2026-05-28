import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import templateReducer from "../features/template/templateSlice";
import headerReducer from "../features/header/headerSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import clientReducer from "../features/client/clientSlice";
import masterReducer from "../features/master/masterSlice";
import kycReducer from "../features/kyc/kycSlice";
import transactionReducer from "../features/transactions/transactionSlice";
import sipReducer from "../features/sip/sipSlice";
import lumpsumReducer from "../features/reports/lumpsum/lumpsumSlice";
import sipBookedRecord from "../features/reports/sipBooked/sipbookedSlice";
import SipBusinessRecord from "../features/reports/sipBusiness/sipBusinessSlice";
import missingSipRecord from "../features/reports/missingSip/missingSipSlice";
import inactiveInvestorsRecord from "../features/reports/inactiveInvestors/inactiveInvestorsSlice";
import complianceRecord from "../features/reports/complianceRecords/complianceRecordsSlice";
import reportsReducer from "../features/reports/sipMining/sipMiningSlice";
import earningsReducer from "../features/Earnings/earningsSlice";
import salesReducer from "../features/sales/salesSlice";
import invoiceReducer from "../features/invoice/invoiceSlice";
import TemplateData from "../features/template/templateSlice";
import buyReducer from "../features/buy/buySlice";
import sellReducer from "../features/sell/sellSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice";
import jewelleryReducer from "../features/jewellery/jewellerySlice";
import knowledgeReducer from "../features/knowledge/knowledgeSlice";
import policyReducer from "../features/policy/policySlice";
import faqReducer from "../features/faq/faqSlice";
import blogReducer from "../features/blog/blogSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  template: templateReducer,
  header: headerReducer,
  dashboard: dashboardReducer,
  client: clientReducer,
  master: masterReducer,
  kyc: kycReducer,
  transactions: transactionReducer,
  sip: sipReducer,
  lumpsum: lumpsumReducer,
  sipBooked: sipBookedRecord,
  sipBusiness: SipBusinessRecord,
  missingSip: missingSipRecord,
  inactiveInvestors: inactiveInvestorsRecord,
  complianceRecords: complianceRecord,
  reports: reportsReducer,
  earnings: earningsReducer,
  sales: salesReducer,
  invoice: invoiceReducer,
  TemplateData: TemplateData,
  buy: buyReducer,
  sell: sellReducer,
  portfolio: portfolioReducer,
  jewellery: jewelleryReducer,
  knowledge: knowledgeReducer,
  policy: policyReducer,
  faq: faqReducer,
  blog: blogReducer,
});

export default rootReducer;
