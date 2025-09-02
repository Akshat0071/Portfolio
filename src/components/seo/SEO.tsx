import React from 'react';
import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: Record<string, any>;
};

const defaultProps = {
  title: import.meta.env.VITE_APP_TITLE || 'Akshat Bansal | Full-Stack Developer & Cloud Computing Enthusiast',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Full-Stack Developer and Cloud Computing Enthusiast with expertise in building scalable web applications and cloud solutions.',
  ogType: 'website',
  ogImage: '/akshat.jpg',
  twitterCard: 'summary_large_image',
  twitterSite: '@AkshatBansal',
  twitterCreator: '@AkshatBansal',
};

const SEO: React.FC<SEOProps> = ({
  title = defaultProps.title,
  description = defaultProps.description,
  canonicalUrl,
  ogType = defaultProps.ogType,
  ogImage = defaultProps.ogImage,
  twitterCard = defaultProps.twitterCard,
  twitterSite = defaultProps.twitterSite,
  twitterCreator = defaultProps.twitterCreator,
  structuredData,
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://akshatbansal.dev';
  const fullOgImage = ogImage?.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}` : siteUrl;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Akshat Bansal" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta property="twitter:url" content={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Akshat Bansal" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
