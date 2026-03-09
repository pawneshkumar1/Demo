import React from 'react';
import { Hero } from '../components/Hero';
import { TrustMetrics } from '../components/TrustMetrics';
import { Offerings } from '../components/Offerings';
import { WhyPartner } from '../components/WhyPartner';
import { Partners } from '../components/Partners';
import { Blog } from '../components/Blog';
import { DownloadBanner } from '../components/DownloadBanner';

export const Home = () => {
  return (
    <main>
      <Hero />
      <TrustMetrics />
      <Offerings />
      <WhyPartner />
      <Partners />
      <DownloadBanner />
    </main>
  );
};
