import Layout from '@/components/layout/Layout';
import GlobalReachGraphic from '@/components/about/GlobalReachGraphic';
import SEOHead from '@/components/seo/SEOHead';
import {
  Globe,
  Users,
  Shield,
  Award,
  Target,
  Heart,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { WHATSAPP_LINK } from '@/lib/constants';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '250+', label: 'Families Served' },
  { value: '20+', label: 'Countries' },
  { value: '99%', label: 'Success Rate' },
];

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'We believe in complete honesty about timelines, costs, and expectations. No hidden fees, no false promises.',
  },
  {
    icon: Target,
    title: 'Client-First Approach',
    description: 'Your goals drive our recommendations. We find the right program for you, not the one with the highest commission.',
  },
  {
    icon: Award,
    title: 'Excellence in Execution',
    description: 'Meticulous attention to detail in every application. Our 99% approval rate speaks for itself.',
  },
  {
    icon: Heart,
    title: 'Long-Term Relationships',
    description: 'We build lasting partnerships with our clients, supporting their global mobility needs for years to come.',
  },
];

const team = [
  {
    name: 'Expert Consultants',
    role: 'Immigration Specialists',
    description: 'Our team of certified immigration consultants has deep expertise in citizenship and residency programs worldwide.',
  },
  {
    name: 'Legal Partners',
    role: 'Licensed Attorneys',
    description: 'We work with top-tier legal professionals in every jurisdiction to ensure full compliance and protection.',
  },
  {
    name: 'Client Success Team',
    role: 'Dedicated Support',
    description: 'Your personal success managers guide you through every step, available 24/7 for questions and updates.',
  },
];

const About = () => {
  return (
    <Layout>
      <SEOHead
        title="About Us — Trusted Investment Migration Advisors | Passport Capital"
        description="10+ years helping 250+ families obtain second citizenship and residency. Learn about our mission, values, and expert team."
        path="/about"
      />
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                About Passport Capital
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Your Gateway to <span className="text-primary">Global Freedom</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're a team of global mobility experts dedicated to helping high-net-worth individuals and families secure their future through strategic citizenship and residency planning.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="gradient-royal text-primary-foreground shadow-royal"
                >
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <GlobalReachGraphic />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-royal flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-foreground">250+</p>
                    <p className="text-sm text-muted-foreground">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Passport Capital was founded with a simple mission: to make global citizenship accessible to forward-thinking individuals who understand the value of having a Plan B.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              In an increasingly uncertain world, we recognized that traditional boundaries no longer serve the globally-minded. Whether it's for business expansion, family security, tax optimization, or lifestyle freedom, having citizenship or residency options in multiple countries is no longer a luxury – it's a strategic necessity.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to be trusted advisors to entrepreneurs, executives, crypto pioneers, and families worldwide. Our deep relationships with government agencies and licensed agents ensure that every application receives the attention and expertise it deserves.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every interaction and decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-royal flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert professionals dedicated to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-primary text-sm text-center mb-4">{member.role}</p>
                <p className="text-muted-foreground text-center">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Global Presence, Personal Service
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                With partners and representatives across 20+ countries, we provide local expertise with a global perspective. Wherever your citizenship journey takes you, we're there to support you.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Caribbean: St. Kitts, Dominica, Grenada, St. Lucia, Antigua</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Europe: Malta, Portugal, Greece, Hungary, Latvia, Serbia</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Middle East: UAE, Turkey, Jordan</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Pacific & Africa: Vanuatu, São Tomé, El Salvador, Paraguay</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-6">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Headquarters</h4>
                <p className="text-muted-foreground text-sm">Dubai, UAE</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <Globe className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Coverage</h4>
                <p className="text-muted-foreground text-sm">20+ Countries</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <Clock className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Availability</h4>
                <p className="text-muted-foreground text-sm">24/7 Support</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Team Size</h4>
                <p className="text-muted-foreground text-sm">50+ Experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container-wide text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Let's Build Your Global Future Together
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Ready to take the first step? Our team is here to guide you through every stage of your citizenship journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90 shadow-lg"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Contact Us Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
