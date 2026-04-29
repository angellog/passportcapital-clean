import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { FileText, Search, UserCheck, Plane, CheckCircle, Clock, Shield, Globe, ArrowRight, DollarSign, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { CONSULTATION_FEE, COMMITMENT_FEE_RATE, WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';
import { TelegramIcon } from '@/components/shared/TelegramIcon';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Initial Consultation',
    description: 'We analyze your goals, budget, and lifestyle preferences to identify the best citizenship or residency options for you.',
    duration: '1-2 Days',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Document Preparation',
    description: 'Our team guides you through gathering required documents including proof of funds, background checks, and identity verification.',
    duration: '2-4 Weeks',
  },
  {
    number: '03',
    icon: UserCheck,
    title: 'Application Submission',
    description: 'We prepare and submit your complete application to the relevant government authorities with all supporting documentation.',
    duration: '1-2 Weeks',
    hasFees: true,
    fees: [
      { label: 'Consultation Fee', amount: `$${CONSULTATION_FEE}` },
      { label: 'Commitment Fee', amount: `${COMMITMENT_FEE_RATE * 100}%`, note: 'of program investment' },
    ],
  },
  {
    number: '04',
    icon: Clock,
    title: 'Due Diligence',
    description: 'Government agencies conduct thorough background checks and verify your application details. We monitor progress throughout.',
    duration: '2-6 Months',
  },
  {
    number: '05',
    icon: CheckCircle,
    title: 'Approval & Investment',
    description: 'Upon approval, you make your qualifying investment (real estate, donation, or business) through secure government channels.',
    duration: '1-4 Weeks',
  },
  {
    number: '06',
    icon: Plane,
    title: 'Citizenship/Residency Granted',
    description: 'Receive your new passport or residency permit. We assist with oath ceremonies, document collection, and next steps.',
    duration: 'Complete!',
  },
];

const faqs = [
  {
    question: 'What fees are required to start my application?',
    answer: `At the Application Submission stage, a $${CONSULTATION_FEE} consultation fee and ${COMMITMENT_FEE_RATE * 100}% commitment fee (calculated on your program investment) are due. These fees confirm your application and enable Passport Capital to begin processing your file and conducting due diligence on your behalf.`,
  },
  {
    question: 'What is Citizenship by Investment (CBI)?',
    answer: 'CBI programs allow individuals to obtain citizenship in a country by making a significant economic contribution, typically through real estate investment, government donations, or business investments.',
  },
  {
    question: 'Is dual citizenship allowed?',
    answer: 'Most CBI programs allow dual citizenship, meaning you can keep your current passport while obtaining a new one. However, some countries have restrictions, so we advise based on your specific situation.',
  },
  {
    question: 'How long does the process take?',
    answer: 'Processing times vary by program. The fastest options like Vanuatu take 30-60 days, while European programs typically take 3-6 months. Caribbean programs average 3-4 months.',
  },
  {
    question: 'Can my family be included?',
    answer: 'Yes! Most programs include spouse, dependent children, and sometimes parents or grandparents. Some programs allow siblings as dependents too.',
  },
  {
    question: 'Do I need to live in the country?',
    answer: 'Most CBI programs have no physical residency requirements. Some residency programs require minimal stays (7-14 days annually), while others have no requirements at all.',
  },
  {
    question: 'Are cryptocurrency investments accepted?',
    answer: 'Several programs now accept cryptocurrency payments, including Vanuatu, El Salvador, and through certain real estate developers. We specialize in crypto-friendly options.',
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      <SEOHead
        title="How It Works — Citizenship by Investment Process | Passport Capital"
        description="Learn how the citizenship and residency by investment process works. From initial consultation to passport approval in 5 simple steps."
        path="/how-it-works"
      />
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-wide text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Your Journey to Global Freedom
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How Citizenship by Investment Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A transparent, step-by-step guide to obtaining your second citizenship or residency through investment programs.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span>Government Authorized</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-5 h-5 text-primary" />
              <span>20+ Countries</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>99% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The 6-Step Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From initial consultation to receiving your new passport, here's exactly what to expect.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                    <div className={`bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                      index % 2 === 0 ? 'md:ml-auto' : ''
                    } max-w-lg`}>
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-14 h-14 rounded-xl gradient-royal flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div>
                          <span className="text-sm text-primary font-semibold">Step {step.number}</span>
                          <h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{step.description}</p>

                      {step.hasFees && step.fees && (
                        <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">Fees Due at This Stage</span>
                          </div>
                          <div className="space-y-2">
                            {step.fees.map((fee, feeIndex) => (
                              <div key={feeIndex} className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">{fee.label}</span>
                                <div className="text-right">
                                  <Badge variant="secondary" className="font-bold">
                                    {fee.amount}
                                  </Badge>
                                  {fee.note && (
                                    <span className="text-xs text-muted-foreground ml-1">{fee.note}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-accent/50 rounded-full text-sm ${
                        index % 2 === 0 ? 'md:ml-auto' : ''
                      }`}>
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-foreground font-medium">{step.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 hidden md:block" style={{ top: '2rem' }} />

                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Fees
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing with no hidden costs. All fees are due at the Application Submission stage.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl gradient-royal flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Consultation Fee</h3>
                  <p className="text-3xl font-bold text-primary">${CONSULTATION_FEE}</p>
                </div>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Expert analysis of your eligibility and goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Personalized program recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Initial document review and guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Complete cost breakdown for your chosen program</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl gradient-royal flex items-center justify-center">
                  <BadgePercent className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Commitment Fee</h3>
                  <p className="text-3xl font-bold text-primary">{COMMITMENT_FEE_RATE * 100}%</p>
                  <p className="text-sm text-muted-foreground">of program investment</p>
                </div>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Confirms your application and reserves your slot</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Initiates full due diligence on your file</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Dedicated case manager assigned</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Priority processing and government liaison</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-card border border-primary/20 rounded-2xl p-6">
            <h4 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
              Example: Dominica Donation Program ($100,000)
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Consultation Fee</span>
                <span className="font-semibold text-foreground">${CONSULTATION_FEE}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Commitment Fee ({COMMITMENT_FEE_RATE * 100}% of $100,000)</span>
                <span className="font-semibold text-foreground">${COMMITMENT_FEE_RATE * 100000}</span>
              </div>
              <div className="flex justify-between items-center py-2 bg-primary/5 rounded-lg px-3">
                <span className="font-semibold text-foreground">Total Due at Application</span>
                <span className="font-bold text-primary text-xl">${CONSULTATION_FEE + COMMITMENT_FEE_RATE * 100000}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Types of Qualifying Investments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Different programs accept various forms of investment contributions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Real Estate</h3>
              <p className="text-muted-foreground mb-4">
                Purchase government-approved property with potential for rental income and capital appreciation.
              </p>
              <p className="text-sm text-primary font-semibold">From $200,000</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Government Donation</h3>
              <p className="text-muted-foreground mb-4">
                Non-refundable contribution to national development funds. Fastest and simplest option.
              </p>
              <p className="text-sm text-primary font-semibold">From $100,000</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Business Investment</h3>
              <p className="text-muted-foreground mb-4">
                Invest in approved enterprises or create jobs. Ideal for entrepreneurs seeking active involvement.
              </p>
              <p className="text-sm text-primary font-semibold">From $150,000</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to the most common questions about citizenship by investment.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container-wide text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Book a free consultation with our experts to discuss your options and create a personalized plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90 shadow-lg"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90 shadow-lg"
            >
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <TelegramIcon className="mr-2" />
                Telegram
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/programs">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
