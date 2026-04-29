import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import MediaTrustBar from '@/components/home/MediaTrustBar';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CryptoBadges from '@/components/home/CryptoBadges';
import ContactForm from '@/components/contact/ContactForm';
import SEOHead from '@/components/seo/SEOHead';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Passport Capital | Citizenship & Residency by Investment"
        description="Secure a second passport or golden visa through government-approved investment programs in 20+ countries. Expert guidance from consultation to approval."
        path="/"
      />
      <OrganizationJsonLd />
      <Hero />
      <MediaTrustBar />
      <FeaturedPrograms />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CryptoBadges />
      <ContactForm />
    </Layout>
  );
};

export default Index;
