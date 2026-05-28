import React from "react";
import logo from "../assets/logo/BatukRoundedLogo.avif";

interface PoweredByBatukProps {
  collapsed?: boolean;
}

const PoweredByBatuk: React.FC<PoweredByBatukProps> = ({
  collapsed = false,
}) => {
  return (
    <div
      className={`relative transition-all duration-500 ease-in-out h-[64px] bg-white border-2 border-[#4a2a7d] rounded-xl flex items-center overflow-visible w-full ${
        collapsed ? "justify-center" : "px-3"
      }`}
    >
      <span
        className={`absolute -top-2.5 left-1/3 -translate-x-1/2 bg-white font-bold whitespace-nowrap m-0 text-[11px] text-[#4a2a7d] text-center px-1.5 transition-opacity duration-300 ease-in-out ${
          !collapsed ? "opacity-100 delay-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Powered by
      </span>

      <img
        src={logo}
        alt="Batuk Logo"
        className="w-[40px] shrink-0 object-contain"
      />

      <div
        className={`leading-none text-[#4a2a7d] flex flex-col transition-all duration-500 ease-in-out overflow-hidden ${
          !collapsed ? "w-[110px] opacity-100 ml-2.5" : "w-0 opacity-0 ml-0"
        }`}
      >
        <span className="text-[24px] font-bold block whitespace-nowrap tracking-tight">
          BATUK
        </span>
        <p className="m-0 text-[10px] italic whitespace-nowrap opacity-80 mt-0.5">
          Gold Reimagined
        </p>
      </div>
    </div>
  );
};

export default PoweredByBatuk;
