import React from "react";
import { motion } from "motion/react";
import { User, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "../../components/SectionHeader";
import { Button } from "@/src/components/Button";

export const Registration = () => {
  const partnerTypes = [
    {
      id: "individual",
      title: "Individual Partner",
      description:
        "Join as an individual and start offering digital gold & silver.",
      icon: <User size={32} />,
      link: "/register/individual",
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "entity",
      title: "Entity Partner",
      description:
        "Register your company or organization as a corporate partner.",
      icon: <Building2 size={32} />,
      link: "/register/entity",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg-light">
      <div className="container-custom max-w-4xl">
        <SectionHeader
          title={
            <>
              Partner With <span className="text-primary">Batuk</span>
            </>
          }
          subtitle="Start offering digital gold & silver with a trusted platform."
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {partnerTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link
                to={type.link}
                className="group block bg-white p-5 rounded-2xl border border-slate-100 shadow-xl shadow-primary/5 hover:shadow-primary/10 hover:border-primary/20 transition-all h-full"
              >
                {/* Center Content */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {type.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {type.title}
                  </h3>

                  <p className="text-slate-600 mb-5 leading-relaxed">
                    {type.description}
                  </p>

                  <Button fullWidth size="md">
                    <p className="flex items-center justify-center gap-2 text-white font-700">
                      Get Started
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-2 transition-transform"
                      />
                    </p>
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

// import React from "react";
// import { motion } from "motion/react";
// import { User, Building2, ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import { SectionHeader } from "../../components/SectionHeader";
// import { Button } from "@/src/components/Button";

// export const Registration = () => {
//   const partnerTypes = [
//     {
//       id: "individual",
//       title: "Individual Partner",
//       description:
//         "Join as an individual and start offering digital gold & silver.",
//       icon: <User size={32} />,
//       link: "/register/individual",
//       color: "bg-blue-50 text-blue-600",
//     },
//     {
//       id: "entity",
//       title: "Entity Partner",
//       description:
//         "Register your company or organization as a corporate partner.",
//       icon: <Building2 size={32} />,
//       link: "/register/entity",
//       color: "bg-purple-50 text-purple-600",
//     },
//   ];

//   return (
//     <main className="min-h-screen pt-32 pb-20 bg-bg-light">
//       <div className="container-custom max-w-4xl">
//         <SectionHeader
//           title={
//             <>
//               Partner With <span className="text-primary">Batuk</span>
//             </>
//           }
//           subtitle="Start offering digital gold & silver with a trusted platform."
//           align="center"
//           className="mb-16"
//         />

//         <div className="grid md:grid-cols-2 gap-8">
//           {partnerTypes.map((type, index) => (
//             <motion.div
//               key={type.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 + index * 0.1 }}
//             >
//               <Link
//                 to={type.link}
//                 className="group block bg-white p-5 rounded-2xl border border-slate-100 shadow-xl shadow-primary/5 hover:shadow-primary/10 hover:border-primary/20 transition-all h-full"
//               >
//                 <div
//                   className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
//                 >
//                   {type.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-900 mb-2">
//                   {type.title}
//                 </h3>
//                 <p className="text-slate-600 mb-3 leading-relaxed">
//                   {type.description}
//                 </p>
//                 <Button fullWidth size="md">
//                   <p className="flex items-center gap-2 text-white font-700">
//                     Get Started{" "}
//                     <ArrowRight
//                       size={20}
//                       className="group-hover:translate-x-2 transition-transform"
//                     />
//                   </p>
//                 </Button>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };
