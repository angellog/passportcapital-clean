import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '@/lib/constants';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  path = '/',
  ogImage = '/og-image.png',
  type = 'website',
  noindex = false
}: SEOHeadProps) => {
  const fullUrl = `${BASE_URL}${path}`;
  const fullImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Passport Capital" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
};

export default SEOHead;
