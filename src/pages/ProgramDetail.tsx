import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProgram } from '@/hooks/usePrograms';
import ProgramHero from '@/components/program/ProgramHero';
import QuickFacts from '@/components/program/QuickFacts';
import ProgramOverview from '@/components/program/ProgramOverview';
import InvestmentCard from '@/components/program/InvestmentCard';
import AboutCountry from '@/components/program/AboutCountry';
import BenefitsSection from '@/components/program/BenefitsSection';
import ApplicationTimeline from '@/components/program/ApplicationTimeline';
import EligibilityRequirements from '@/components/program/EligibilityRequirements';
import RequiredDocuments from '@/components/program/RequiredDocuments';
import VisaFreeTravel from '@/components/program/VisaFreeTravel';
import ProgramFAQ from '@/components/program/ProgramFAQ';
import ProgramCTA from '@/components/program/ProgramCTA';
import SEOHead from '@/components/seo/SEOHead';
import { FAQPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { BASE_URL } from '@/lib/constants';

const defaultFaqs = [
  { question: 'What is the minimum investment required?', answer: 'The minimum investment varies by program. Contact us for detailed pricing.' },
  { question: 'Can I include my family?', answer: 'Yes, most programs allow spouse, dependent children, and sometimes parents.' },
  { question: 'Is the process fully remote?', answer: 'Most programs can be completed 100% remotely.' },
  { question: 'How fast can I get approval?', answer: 'Processing times vary from a few weeks to several months.' },
  { question: 'Is dual citizenship allowed?', answer: 'Most citizenship by investment programs allow dual citizenship.' },
];

const ProgramDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: program, isLoading } = useProgram(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  if (!program) {
    return <Navigate to="/programs" replace />;
  }

  const programTypeLabel = program.programType === 'citizenship' ? 'Citizenship' : 'Residency';
  const faqs = (program.faqs as { question: string; answer: string }[] | undefined) || defaultFaqs;

  return (
    <Layout>
      <SEOHead
        title={`${program.country} ${programTypeLabel} by Investment | Passport Capital`}
        description={program.description || `Learn about the ${program.country} ${programTypeLabel.toLowerCase()} by investment program. Investment options, processing times, and benefits.`}
        path={`/programs/${program.id}`}
      />
      <FAQPageJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: `${BASE_URL}/` },
        { name: 'Programs', url: `${BASE_URL}/programs` },
        { name: program.country, url: `${BASE_URL}/programs/${program.id}` },
      ]} />
      <ProgramHero program={program} />
      <QuickFacts program={program} />
      <ProgramOverview program={program} />

      <section className="py-12 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AboutCountry program={program} />
            </div>
            <div className="lg:col-span-1">
              <InvestmentCard program={program} />
            </div>
          </div>
        </div>
      </section>

      <BenefitsSection program={program} />
      <ApplicationTimeline program={program} />
      <EligibilityRequirements program={program} />
      <RequiredDocuments program={program} />
      <VisaFreeTravel program={program} />
      <ProgramFAQ program={program} />
      <ProgramCTA program={program} />
    </Layout>
  );
};

export default ProgramDetail;
