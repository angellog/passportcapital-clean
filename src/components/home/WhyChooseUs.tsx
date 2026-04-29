import { Shield, Award, Users, CheckCircle2, Globe, Wallet, ArrowUpRight } from 'lucide-react';
import navyLeatherTexture from '@/assets/navy-leather-texture.png';

const features = [
  {
    icon: Shield,
    title: 'Vetted Programs Only',
    description: 'We only work with government-authorized programs with proven track records and transparent processes.',
    highlight: 'Government-Authorized',
  },
  {
    icon: Award,
    title: '99% Success Rate',
    description: 'Pre-vetting ensures your application meets all approval standards before submission.',
    highlight: '99% Approved',
  },
  {
    icon: Users,
    title: 'Holistic Approach',
    description: 'We consider your tax planning, lifestyle goals, and long-term vision to find the perfect program.',
    highlight: 'Tailored Solutions',
  },
  {
    icon: CheckCircle2,
    title: 'End-to-End Support',
    description: 'From initial consultation to passport collection, we handle every step of your journey.',
    highlight: 'Full Service',
  },
  {
    icon: Globe,
    title: '20+ Countries',
    description: 'Access the most comprehensive portfolio of citizenship and residency programs globally.',
    highlight: 'Global Coverage',
  },
  {
    icon: Wallet,
    title: 'Crypto-Friendly',
    description: 'Make investments using Bitcoin, Ethereum, Tether, and other major cryptocurrencies.',
    highlight: 'Digital Payments',
  },
];

const stats = [
  { value: '250+', label: 'Families Served' },
  { value: '10+', label: 'Years Experience' },
  { value: '24/7', label: 'Client Support' },
  { value: '$50M+', label: 'Investments Facilitated' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gold/5 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-wide relative">
        <div className="section-header">
          <div className="section-label">
            <Award className="w-4 h-4" />
            <span>Why Passport Capital</span>
          </div>
          <h2 className="section-title">Your Trusted CBI Partner</h2>
          <p className="section-subtitle">
            With over a decade of experience and thousands of successful applications,
            we're the partner you can trust for your citizenship journey.
          </p>
          <div className="divider-royal mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-14 h-14 rounded-2xl gradient-royal flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-royal transition-all duration-300 relative">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              <span className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-xs font-medium rounded-full mb-4">
                {feature.highlight}
              </span>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{
            backgroundImage: `url(${navyLeatherTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-sapphire-deep/20 via-transparent to-sapphire-deep/30 rounded-3xl" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2">
            <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-gold">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
