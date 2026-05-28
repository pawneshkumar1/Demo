import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, MessageCircle } from "lucide-react";

interface DraggableChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const TAWK_CHAT_URL = "https://tawk.to/chat/67f4c7b8d27161190defad5a/1ioa2oag7";

export const DraggableChat: React.FC<DraggableChatProps> = ({
  isOpen,
  onClose,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const tawk = (window as any).Tawk_API;

  const sendEvent = (event: string) => {
    if (tawk?.addEvent) {
      tawk.addEvent(event, {
        page: window.location.pathname,
        time: new Date().toISOString(),
      });
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={false}
      animate={{
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.9,
        y: isOpen ? 0 : 20,
      }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-[3000] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      style={{
        width: "380px",
        height: isMinimized ? "48px" : "580px",
        touchAction: "none",
        visibility: isOpen ? "visible" : "hidden",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      {/* HEADER */}
      <div className="h-12 bg-primary px-3 flex items-center justify-between cursor-move shrink-0">
        <div className="flex items-center gap-2 text-white">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>

            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border border-primary" />
          </div>

          <div>
            <h3 className="text-xs font-semibold leading-none">
              Batuk Support
            </h3>

            <p className="text-[10px] text-white/70 mt-0.5">Online now</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1">
          {/* MINIMIZE */}
          <button
            onClick={() => {
              const next = !isMinimized;

              setIsMinimized(next);

              if (next) {
                sendEvent("chat_minimized");

                tawk?.minimize();
              } else {
                sendEvent("chat_restored");

                tawk?.maximize();
              }
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Minus size={15} />
          </button>

          {/* CLOSE */}
          <button
            onClick={() => {
              sendEvent("chat_closed");

              tawk?.shutdown();

              onClose();
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* CHAT */}
      <div
        className="flex-1 bg-white"
        style={{
          display: isMinimized ? "none" : "block",
        }}
      >
        <iframe
          src={TAWK_CHAT_URL}
          title="Batuk Support Chat"
          className="w-full h-full border-none"
        />
      </div>
    </motion.div>
  );
};

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, MessageSquare, Minus } from "lucide-react";

// interface DraggableChatProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const TAWK_CHAT_URL = "https://tawk.to/chat/67f4c7b8d27161190defad5a/1ioa2oag7";

// export const DraggableChat: React.FC<DraggableChatProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [isMinimized, setIsMinimized] = useState(false);

//   const tawk = (window as any).Tawk_API;

//   const sendEvent = (event: string) => {
//     if (tawk?.addEvent) {
//       tawk.addEvent(event, {
//         page: window.location.pathname,
//         time: new Date().toISOString(),
//       });
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
// <motion.div
//   drag
//   dragMomentum={false}
//   initial={{ opacity: 0, scale: 0.9, y: 20 }}
//   animate={{
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     height: isMinimized ? "auto" : "500px",
//     width: "350px",
//   }}
//   exit={{ opacity: 0, scale: 0.9, y: 20 }}
//   className="fixed bottom-10 right-10 z-[3000] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
//   style={{ touchAction: "none" }}
// >
//           {/* Header/Handle */}
//           <div className="bg-primary p-3 flex items-center justify-between cursor-move group">
//             <div className="flex items-center gap-2 text-white">
//               <div className="p-1.5 bg-white/10 rounded-lg">
//                 <MessageSquare size={18} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold leading-none">
//                   Batuk Support
//                 </h3>
//                 <p className="text-[10px] text-white/60 font-medium mt-1">
//                   Online | Typically replies in minutes
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() => {
//                   const next = !isMinimized;

//                   setIsMinimized(next);

//                   if (next) {
//                     sendEvent("chat_minimized");

//                     tawk?.minimize();
//                   } else {
//                     sendEvent("chat_restored");

//                     tawk?.maximize();
//                   }
//                 }}
//                 className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
//               >
//                 <Minus size={18} />
//               </button>
//               <button
//                 onClick={() => {
//                   sendEvent("chat_closed");

//                   tawk?.shutdown();

//                   onClose();
//                 }}
//                 className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Chat Container */}
//           {!isMinimized && (
//             <div className="flex-1 bg-white relative flex flex-col">
//               <iframe
//                 src={TAWK_CHAT_URL}
//                 className="flex-1 w-full h-full border-none"
//                 title="Tawk.to Support Chat"
//               />
//             </div>
//           )}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
