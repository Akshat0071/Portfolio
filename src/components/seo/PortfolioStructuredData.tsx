import React from 'react';
import StructuredData from './StructuredData';

const PortfolioStructuredData: React.FC = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://akshatbansal.dev';
  
  const portfolioData = {
    '@type': 'Person',
    name: 'Akshat Bansal',
    url: siteUrl,
    sameAs: [
      'https://github.com/Akshat0071',
      'https://linkedin.com/in/akshatbansal-dev',
      'https://twitter.com/AkshatBansal',
    ],
    jobTitle: 'Full-Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    description: 'Full-Stack Developer and Cloud Computing Enthusiast with expertise in building scalable web applications and cloud solutions.',
  };

  return <StructuredData data={portfolioData} />;
};

export default PortfolioStructuredData;
