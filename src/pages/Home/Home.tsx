import React from "react";
import { Hero } from "./Hero";
import { TrustMetrics } from "./TrustMetrics";
import { Offerings } from "./Offerings";
import { WhyPartner } from "./WhyPartner";
import { DownloadBanner } from "./DownloadBanner";
import OurPartner from "./OurPartner";
import { SavingsManaged } from "./SavingsManaged";
import TrustAndSecurity from "./TrustAndSecurity";
import { HowBatukWorks } from "./HowBatukWorks";

export const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <SavingsManaged />
      {/* <TrustMetrics /> */}
      <TrustAndSecurity />
      <Offerings />
      <HowBatukWorks />
      <WhyPartner />
      <OurPartner />
      <DownloadBanner />
    </div>
  );
};
