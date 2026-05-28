// import React, { useState, useEffect } from "react";
// import { motion } from "motion/react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../redux/store";
// import { fetchKycClientList } from "../../features/kyc/kycApi";
// import { setSelectedClientId } from "../../features/kyc/kycSlice";
// import { Table, Column } from "../../components/Table";
// import { Button } from "../../components/Button";
// import { useNavigate } from "react-router-dom";

// export const CreateSell: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const [searchTerm, setSearchTerm] = useState("");

//   const { kycClientList, loading } = useSelector(
//     (state: RootState) => state.kyc,
//   );

//   useEffect(() => {
//     dispatch(fetchKycClientList());
//   }, [dispatch]);

//   const filteredInvestors = kycClientList.filter(
//     (investor: any) =>
//       investor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       investor.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       investor.mobileNo?.includes(searchTerm),
//   );

//   const columns: Column<any>[] = [
//     { key: "name", sortable: true, filterable: true, header: "Investor Name" },
//     { key: "Email", sortable: true, filterable: true, header: "Email Address" },
//     {
//       key: "mobileNo",
//       sortable: true,
//       filterable: true,
//       header: "Mobile Number",
//     },
//     {
//       key: "actions",
//       header: "Action",
//       cell: (item) => (
//         <div className="flex justify-center">
//           <Button
//             size="sm"
//             variant="primary"
//             onClick={() => {
//               navigate("/dashboard/sell/create-sell/create-sell-order", {
//                 state: { clientId: item._id, clientName: item.name },
//               });
//             }}
//             className="h-8 px-4 text-[10px] "
//           >
//             SELECT
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-4 flex flex-col gap-8">
//       {/* Main content */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex-1"
//       >
//         <Table
//           title="Choose an Investor"
//           columns={columns}
//           data={filteredInvestors}
//           searchPlaceholder="Search by name, email or mobile..."
//           onSearch={(val) => setSearchTerm(val)}
//           entriesPerPage={10}
//           loading={loading}
//         />
//       </motion.div>
//     </div>
//   );
// };
