// import React from "react";
// import fintsoWM from "../assets/logo/OurPartnerLogo/fintsoLogo_Mob.2fb7724b.png";
// import financialServices from "../assets/logo/OurPartnerLogo/PB Financial Services 1.png";
// import mechMiles from "../assets/logo/OurPartnerLogo/Mehmiles logo 1.png";
// import AssetSynthesis from "../assets/logo/OurPartnerLogo/AssetSynthesis.png";
// import Bhavinkumar from "../assets/logo/OurPartnerLogo/Bhavinkumar.png";
// import Findarts from "../assets/logo/OurPartnerLogo/Findarts.png";
// import FuturePrenuer from "../assets/logo/OurPartnerLogo/FuturePrenuer.png";
// import RealValue from "../assets/logo/OurPartnerLogo/RealValue.jpeg";

// import styled, { keyframes, css } from "styled-components";
// import { SectionHeader } from "./SectionHeader";

// const OurPartner = () => {
//   // const row1 = [fintsoWM, financialServices, mechMiles];
//   const row1 = [
//     { src: fintsoWM, alt: "Fintso WM" },
//     { src: financialServices, alt: "Financial Services" },
//     { src: mechMiles, alt: "Mech Miles" },
//     { src: AssetSynthesis, alt: "Asset Synthesis" },
//     { src: Bhavinkumar, alt: "Bhavin Kumar" },
//     { src: Findarts, alt: "Findarts" },
//     { src: FuturePrenuer, alt: "Future Prenuer" },
//     { src: RealValue, alt: "Real Value" },
//   ];

//   return (
//     <AppContainer className="size overflow-hidden">
//       <Wrapper>
//         <SectionHeader
//           title={
//             <>
//               Our <span className="text-primary">Partners</span>
//             </>
//           }
//           subtitle="Our trusted partners bring you exclusive opportunities and exceptional value"
//           align="center"
//           className="mb-10"
//         />
//         <Marquee>
//           <MarqueeGroup>
//             {row1.map((el, i) => (
//               <ImageGroup key={i}>
//                 <Image src={el.src} alt={el.alt} loading="lazy" />
//               </ImageGroup>
//             ))}
//           </MarqueeGroup>
//           <MarqueeGroup>
//             {row1.map((el, i) => (
//               <ImageGroup key={i}>
//                 <Image src={el.src} alt={el.alt} loading="lazy" />
//               </ImageGroup>
//             ))}
//           </MarqueeGroup>
//         </Marquee>
//       </Wrapper>
//     </AppContainer>
//   );
// };

// export default OurPartner;

// const AppContainer = styled.div`
//   width: 100vw;
//   height: 50vh;
//   color: #000000;
//   background-color: #ffffff;

//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   height: fit-content;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;

// const Marquee = styled.div`
//   display: flex;
//   width: 1200px;
//   overflow: hidden;
//   user-select: none;

//   mask-image: linear-gradient(
//     to right,
//     hsl(0 0% 0% / 0),
//     hsl(0 0% 0% / 1) 10%,
//     hsl(0 0% 0% / 1) 90%,
//     hsl(0 0% 0% / 0)
//   );
// `;

// const scrollX = keyframes`
//   from {
//     left: translateX(0);
//   }
//   to {
//     transform: translateX(-100%);
//   }
// `;

// const common = css`
//   flex-shrink: 0;
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
//   white-space: nowrap;
//   width: 100%;
//   animation: ${scrollX} 30s linear infinite;
// `;

// const MarqueeGroup = styled.div`
//   ${common}
// `;

// const ImageGroup = styled.div`
//   display: grid;
//   place-items: center;
//   width: clamp(10rem, 1rem + 40vmin, 30rem);
//   padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 30);
// `;

// const Image = styled.img`
//   object-fit: contain;
//   width: 100%;
//   height: 100%;
//   /* border: 1px solid black; */
//   border-radius: 0.5rem;
//   aspect-ratio: 16/10;
//   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
// `;

import React from "react";
import fintsoWM from "../../assets/logo/OurPartnerLogo/fintsoLogo_Mob.2fb7724b.png";
import financialServices from "../../assets/logo/OurPartnerLogo/PB Financial Services 1.png";
import mechMiles from "../../assets/logo/OurPartnerLogo/Mehmiles logo 1.png";
import AssetSynthesis from "../../assets/logo/OurPartnerLogo/AssetSynthesis.png";
import Bhavinkumar from "../../assets/logo/OurPartnerLogo/Bhavinkumar.png";
import Findarts from "../../assets/logo/OurPartnerLogo/Findarts.png";
import FuturePrenuer from "../../assets/logo/OurPartnerLogo/FuturePrenuer.png";
import RealValue from "../../assets/logo/OurPartnerLogo/RealValue.jpeg";

import { SectionHeader } from "../../components/SectionHeader";

const OurPartner = () => {
  const row1 = [
    { src: fintsoWM, alt: "Fintso WM" },
    { src: financialServices, alt: "Financial Services" },
    { src: mechMiles, alt: "Mech Miles" },
    { src: AssetSynthesis, alt: "Asset Synthesis" },
    { src: Bhavinkumar, alt: "Bhavin Kumar" },
    { src: Findarts, alt: "Findarts" },
    { src: FuturePrenuer, alt: "Future Prenuer" },
    { src: RealValue, alt: "Real Value" },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden flex flex-col justify-center">
      <style>{`
        @keyframes scrollX {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: scrollX 30s linear infinite;
        }
      `}</style>

      <div className="container-custom mb-2">
        <SectionHeader
          title={
            <>
              Our Trusted <span className="text-yellow-400">Partners</span>
            </>
          }
          subtitle="Our partners help us deliver smarter and more secure digital gold and silver solutions across India."
          align="center"
        />
      </div>

      <div className="w-full flex justify-center">
        <div
          className="flex flex-nowrap w-full overflow-hidden select-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Group 1 */}
          <div className="shrink-0 flex items-center justify-around whitespace-nowrap min-w-full animate-marquee">
            {row1.map((el, i) => (
              <div key={i} className="grid place-items-center w-[160px] px-4">
                <img
                  src={el.src}
                  alt={el.alt}
                  loading="lazy"
                  className="object-contain w-full h-[80px] rounded-xl shadow-sm bg-white p-3 border border-slate-100 hover:shadow-md transition-shadow duration-300"
                />
              </div>
            ))}
          </div>

          {/* Group 2 (Duplicate for seamless scroll) */}
          <div className="shrink-0 flex items-center justify-around whitespace-nowrap min-w-full animate-marquee">
            {row1.map((el, i) => (
              <div
                key={`dup-${i}`}
                className="grid place-items-center w-[160px] px-4"
              >
                <img
                  src={el.src}
                  alt={el.alt}
                  loading="lazy"
                  className="object-contain w-full h-[80px] rounded-xl shadow-sm bg-white p-3 border border-slate-100 hover:shadow-md transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartner;
