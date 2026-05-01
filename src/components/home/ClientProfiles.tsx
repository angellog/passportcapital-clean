import { TrendingUp, Users, Laptop, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { WhatsAppIcon } from '@/components/shared';
import { WHATSAPP_LINK } from '@/lib/constants';

const archetypes = [
  {
    icon: TrendingUp,
    name: 'Emerging Market Entrepreneur',
    description: 'Africa, Middle East, South Asia',
    motivator: 'Visa-free mobility & tax efficiency',
    ifYou: "You're building across borders and need a passport that opens doors.",
    ctaLabel: 'Citizenship Programs',
    ctaMessage: 'citizenship programs',
  },
  {
    icon: Users,
    name: 'Family Legacy Planner',
    description: 'Securing citizenship for future generations',
    motivator: 'Education access & global options',
    ifYou: 'You want your children to have the freedom to live, study, and work anywhere.',
    ctaLabel: 'Family Programs',
    ctaMessage: 'family citizenship programs',
  },
  {
    icon: Laptop,
    name: 'Digital Nomad / Remote Executive',
    description: 'Location-independent',
    motivator: 'EU residency or Caribbean citizenship',
    ifYou: 'You work remotely and want a legitimate second residency without the 9-to-5 anchor.',
    ctaLabel: 'Residency Programs',
    ctaMessage: 'residency programs',
  },
  {
    icon: Building2,
    name: "Global Wealth Manager's Client",
    description: 'Ultra-HNW, referred via private banks',
    motivator: 'Estate planning & legacy',
    ifYou: "You're managing significant wealth and need discrete, white-glove citizenship advisory.",
    ctaLabel: 'Premium Advisory',
    ctaMessage: 'premium citizenship advisory',
  },
];

const ClientProfiles = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sapphire-deep/5 rounded-full blur-3xl" />

      <div className="container-wide relative">
        <div className="section-header">
          <div className="section-label">
            <Users className="w-4 h-4" />
            <span>Who We Work With</span>
          </div>
          <h2 className="section-title">One Firm. Four Profiles.</h2>
          <p className="section-subtitle">
            Whether you're an entrepreneur, a parent, a nomad, or a wealth manager's client —
            we have a program tailored to your life.
          </p>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {archetypes.map((archetype, index) => (
            <Card
              key={index}
              className="group bg-white rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 pt-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-5 shadow-gold group-hover:scale-110 transition-transform duration-300">
                  <archetype.icon className="w-7 h-7 text-sapphire-deep" />
                </div>

                <h3 className="font-display text-lg font-semibold text-sapphire-deep mb-1 group-hover:text-primary transition-colors">
                  {archetype.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {archetype.description}
                </p>

                <p className="text-sm font-semibold text-gold-dark mb-3">
                  {archetype.motivator}
                </p>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  This is for you if: {archetype.ifYou}
                </p>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  asChild
                  className="w-full gradient-royal text-primary-foreground rounded-xl shadow-royal hover:shadow-royal-lg transition-all text-sm"
                >
                  <a
                    href={`${WHATSAPP_LINK}?text=Hi%2C%20I%27m%20interested%20in%20your%20${encodeURIComponent(archetype.ctaMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="mr-2 w-4 h-4" />
                    {archetype.ctaLabel}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientProfiles;
