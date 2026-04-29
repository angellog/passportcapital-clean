import { MessageCircle, FileSearch, FileCheck, Plane, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_LINK } from '@/lib/constants';

const steps = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'Free Consultation',
    description: 'Discuss your goals, requirements, and timeline with our expert advisors to identify the perfect program for your needs.',
    accent: 'Schedule a call',
  },
  {
    icon: FileSearch,
    step: '02',
    title: 'Due Diligence',
    description: 'We prepare and review all documentation meticulously, ensuring everything meets program requirements before submission.',
    accent: 'Document review',
  },
  {
    icon: FileCheck,
    step: '03',
    title: 'Application Submission',
    description: 'Your complete application is submitted to the relevant authorities and tracked through every stage of approval.',
    accent: 'Government processing',
  },
  {
    icon: Plane,
    step: '04',
    title: 'Receive Passport',
    description: 'Upon approval, receive your new passport and start enjoying global mobility freedom with your family.',
    accent: 'Welcome aboard',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative">
        <div className="section-header">
          <div className="section-label">
            <FileCheck className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Our streamlined 4-step process makes obtaining a second citizenship
            straightforward and stress-free.
          </p>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-[calc(100%-200px)] h-0.5 bg-gradient-to-r from-border via-primary/30 to-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((item, index) => (
              <div key={index} className="relative group">
                <div className="relative text-center lg:text-left bg-card rounded-2xl p-6 border border-border group-hover:border-primary/30 group-hover:shadow-card-hover transition-all duration-300">
                  <div className="relative mx-auto lg:mx-0 w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-sapphire-deep rounded-2xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-300" />
                    <div className="relative w-full h-full gradient-royal rounded-2xl flex items-center justify-center shadow-royal group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-gold">
                      <span className="text-accent-foreground text-xs font-bold">{item.step}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item.accent}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <ArrowRight className="w-5 h-5 text-border rotate-90 md:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-muted/50 rounded-2xl border border-border">
            <div className="text-center sm:text-left">
              <p className="font-display text-lg font-semibold text-foreground">
                Ready to start your journey?
              </p>
              <p className="text-sm text-muted-foreground">
                Book a free consultation with our experts today
              </p>
            </div>
            <Button
              asChild
              className="gradient-royal text-primary-foreground rounded-xl shadow-royal hover:shadow-royal-lg transition-all"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
