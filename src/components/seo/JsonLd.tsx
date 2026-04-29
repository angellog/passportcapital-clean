import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '@/lib/constants';

interface JsonLdProps {
  data: Record<string, unknown>;
}

const JsonLd = ({ data }: JsonLdProps) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

export const OrganizationJsonLd = () => (
  <JsonLd data={{
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Passport Capital',
    url: BASE_URL,
    description: 'Expert citizenship and residency by investment advisory services.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  }} />
);

export const FAQPageJsonLd = ({ faqs }: { faqs: { question: string; answer: string }[] }) => (
  <JsonLd data={{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }} />
);

export const BreadcrumbJsonLd = ({ items }: { items: { name: string; url: string }[] }) => (
  <JsonLd data={{
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }} />
);

export default JsonLd;
