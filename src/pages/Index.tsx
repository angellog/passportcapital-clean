import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import MediaTrustBar from '@/components/home/MediaTrustBar';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ClientProfiles from '@/components/home/ClientProfiles';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import PartnerBar from '@/components/home/PartnerBar';
import LeadQualifier from '@/components/home/LeadQualifier';
import SEOHead from '@/components/seo/SEOHead';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Passport Capital | Citizenship & Residency by Investment"
        description="Expert citizenship and residency advisory for global investors. Access 27+ government-approved programs across 20+ countries. Same programs. Sharper guidance."
        path="/"
      />
      <OrganizationJsonLd />
      <Hero />
      <MediaTrustBar />
      <FeaturedPrograms />
      <WhyChooseUs />
      <ClientProfiles />
      <HowItWorks />
      <Testimonials />
      <PartnerBar />
      <LeadQualifier />
    </Layout>
  );
};

export default Index;
