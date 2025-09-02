import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        ...data,
      }),
    }}
  />
);

export default StructuredData;
