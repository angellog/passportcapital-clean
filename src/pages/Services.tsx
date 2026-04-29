import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import {
  Globe,
  FileText,
  Users,
  Building,
  Briefcase,
  Shield,
  Wallet,
  Plane,
  ArrowRight,
  CheckCircle,
  Clock,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';
import { TelegramIcon } from '@/components/shared/TelegramIcon';

const services = [
  {
    icon: Globe,
    title: 'Citizenship by Investment',
    description: 'Obtain a second passport through government-approved investment programs in 20+ countries.',
    features: [
      'Caribbean programs (St. Kitts, Dominica, Grenada, etc.)',
      'European pathways (Malta, Portugal, Greece)',
      'Pacific options (Vanuatu, Fiji)',
      'Middle East programs (UAE, Jordan, Turkey)',
    ],
  },
  {
    icon: Building,
    title: 'Residency by Investment',
    description: 'Secure permanent residency rights through real estate or business investments.',
    features: [
      'Golden Visa programs',
      'Investor visa pathways',
      'Retirement residency',
      'Digital nomad visas',
    ],
  },
  {
    icon: FileText,
    title: 'Document Preparation',
    description: 'Complete assistance with gathering, certifying, and translating all required documents.',
    features: [
      'Document checklist creation',
      'Apostille and legalization',
      'Certified translations',
      'Background check coordination',
    ],
  },
  {
    icon: Wallet,
    title: 'Crypto Payment Solutions',
    description: 'Seamlessly use cryptocurrency for your investment in crypto-friendly programs.',
    features: [
      'Bitcoin & Ethereum accepted',
      'Stablecoin transactions',
      'Secure payment processing',
      'Crypto-native programs',
    ],
  },
  {
    icon: Users,
    title: 'Family Applications',
    description: 'Include your entire family in one application with special dependent provisions.',
    features: [
      'Spouse inclusion',
      'Dependent children',
      'Parents & grandparents',
      'Sibling options available',
    ],
  },
  {
    icon: Briefcase,
    title: 'Corporate Relocation',
    description: 'Comprehensive solutions for business owners and executives seeking global mobility.',
    features: [
      'Corporate tax planning',
      'Business establishment',
      'Employee relocation',
      'Banking introductions',
    ],
  },
];

const processSteps = [
  {
    icon: Headphones,
    title: 'Free Consultation',
    description: 'Discuss your goals and get personalized program recommendations.',
  },
  {
    icon: FileText,
    title: 'Program Selection',
    description: 'Choose the best option based on budget, timeline, and requirements.',
  },
  {
    icon: Shield,
    title: 'Due Diligence',
    description: 'We handle all background checks and document verification.',
  },
  {
    icon: CheckCircle,
    title: 'Application & Approval',
    description: 'Submit your complete application and receive your new status.',
  },
];

const Services = () => {
  return (
    <Layout>
      <SEOHead
        title="Our Services — Investment Migration Advisory | Passport Capital"
        description="Full-service citizenship and residency by investment advisory. Crypto-friendly payments, family applications, tax planning, and relocation support."
        path="/services"
      />
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-wide text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Comprehensive Solutions
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            End-to-end support for your global citizenship and residency journey. From consultation to passport collection.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span>10+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-5 h-5 text-primary" />
              <span>20+ Countries</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span>5000+ Families Served</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl gradient-royal flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've streamlined the journey to make obtaining your second citizenship as smooth as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-royal flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Why Passport Capital
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your Trusted Partner in Global Mobility
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're not just consultants – we're your strategic partners in building a secure, borderless future for you and your family.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Government Authorized</h4>
                    <p className="text-muted-foreground text-sm">Licensed agents for all programs we represent. Full legal compliance guaranteed.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Crypto-First Approach</h4>
                    <p className="text-muted-foreground text-sm">Specialists in cryptocurrency payments. We speak your language.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">End-to-End Support</h4>
                    <p className="text-muted-foreground text-sm">From first consultation to passport collection, we handle everything.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-12">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-8">
                Book a free, no-obligation consultation to discuss your goals and explore your options.
              </p>
              <div className="space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full gradient-royal text-primary-foreground shadow-royal"
                >
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    WhatsApp Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#0088cc] text-white hover:bg-[#0088cc]/90"
                >
                  <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                    <TelegramIcon className="mr-2" />
                    Telegram Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  <Link to="/programs">Browse All Programs</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                No commitment required. 100% confidential.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
