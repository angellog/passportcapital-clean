import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import {
  Globe,
  Shield,
  Users,
  Wallet,
  FileText,
  ArrowRight,
  CheckCircle,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  WHATSAPP_LINK,
  TELEGRAM_LINK,
  CONSULTATION_FEE,
  COMMITMENT_FEE_RATE,
  formatCurrency,
} from '@/lib/constants';
import { TelegramIcon, WhatsAppIcon } from '@/components/shared';
import CryptoBadges from '@/components/home/CryptoBadges';

const services = [
  {
    icon: Shield,
    title: 'Citizenship Advisory',
    outcome:
      'A second passport that opens 140+ countries visa-free — with expert guidance on the right program for your situation',
    programs: 'Caribbean, Malta, Turkey, Vanuatu',
  },
  {
    icon: Globe,
    title: 'Residency Advisory',
    outcome:
      'EU residency with a clear path to citizenship — no need to relocate full-time',
    programs: 'Portugal, Greece, Spain, Hungary',
  },
  {
    icon: Users,
    title: 'Family & Legacy Planning',
    outcome:
      'Citizenship and residency structured for your entire family — children, parents, and future generations',
    programs: 'Caribbean family packages, Malta, Portugal',
  },
  {
    icon: Wallet,
    title: 'Crypto-Friendly Programs',
    outcome:
      'Pay for your citizenship or residency program using Bitcoin, Ethereum, USDT, or Solana',
    programs: 'Dominica, Vanuatu, El Salvador, Nauru',
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

const commitmentRateDisplay = `${(COMMITMENT_FEE_RATE * 100).toFixed(1)}%`;

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
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Citizenship & Residency Advisory, Done Right
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We don't just process applications. We advise. From first
            consultation to passport in hand — with transparent fees and a
            dedicated advisor at every step.
          </p>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transparent Fees. No Hidden Markup.
            </h2>
          </div>

          <Card className="max-w-2xl mx-auto border-2 border-primary/20">
            <CardContent className="p-8 text-center space-y-4">
              <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Advisory fee:{' '}
                {formatCurrency(CONSULTATION_FEE)} consultation +{' '}
                {commitmentRateDisplay} of program investment
              </p>
              <p className="text-muted-foreground max-w-lg mx-auto">
                You pay the same government fees as anyone else. Our advisory fee
                is separate, transparent, and stated upfront.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Badge variant="secondary" className="text-sm px-4 py-1.5">
                  No hidden costs
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-1.5">
                  No factory-line processing
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl gradient-royal flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-foreground mb-4 leading-relaxed">
                  {service.outcome}
                </p>
                <p className="text-sm text-muted-foreground">
                  Programs: {service.programs}
                </p>
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
              We've streamlined the journey to make obtaining your second
              citizenship as smooth as possible.
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
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CryptoBadges />

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a consultation and get expert guidance on the right program for
              you.
            </p>
            <div className="space-y-4">
              <Button
                asChild
                size="lg"
                className="w-full gradient-royal text-primary-foreground shadow-royal"
              >
                <Link to="/#lead-qualifier">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full"
              >
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="mr-2" />
                  WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full"
              >
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramIcon className="mr-2" />
                  Telegram
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
