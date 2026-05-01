import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { TrendingUp, Users, Laptop, Building2, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { WhatsAppIcon } from '@/components/shared';
import { WHATSAPP_LINK } from '@/lib/constants';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const profiles = [
  {
    icon: TrendingUp,
    name: 'Emerging Market Entrepreneur',
    region: 'Africa, Middle East, South Asia',
    netWorth: '$1M–$10M',
    motivators: ['Visa-free mobility', 'Tax efficiency', 'Business expansion'],
    ifYou: [
      'You operate across borders and need a passport that opens doors',
      'You want tax optimization without relocation',
      "You're building wealth and need a Plan B",
    ],
    programs: ['Caribbean citizenship (Dominica, St. Lucia, Antigua)'],
    ctaMessage: 'Entrepreneur citizenship advisory',
  },
  {
    icon: Users,
    name: 'Family Legacy Planner',
    region: 'Global',
    netWorth: '$2M–$20M',
    motivators: ['Education access', 'Generational security', 'Global options'],
    ifYou: [
      'You want your children to have the freedom to live, study, and work anywhere',
      "You're planning for the next generation, not just today",
      'You value legacy over lifestyle',
    ],
    programs: ['Malta EU citizenship', 'Caribbean family packages', 'Portugal Golden Visa'],
    ctaMessage: 'Family legacy planning',
  },
  {
    icon: Laptop,
    name: 'Digital Nomad / Remote Executive',
    region: 'Global, location-independent',
    netWorth: '$500K–$3M',
    motivators: ['EU residency', 'Lifestyle freedom', 'Tax optimization'],
    ifYou: [
      'You work remotely and want a legitimate second residency',
      'You want EU access without the 9-to-5 anchor',
      "You're optimizing your tax position legally",
    ],
    programs: ['Portugal Golden Visa', 'Greece Golden Visa', 'Spain RV'],
    ctaMessage: 'Digital nomad residency',
  },
  {
    icon: Building2,
    name: "Global Wealth Manager's Client",
    region: 'Global, referred via private banks/family offices',
    netWorth: '$10M+',
    motivators: ['Estate planning', 'Legacy', 'Discretion'],
    ifYou: [
      "You're managing significant wealth and need discrete advisory",
      'Your clients ask about second citizenship — you need a trusted partner',
      'You want white-glove service, not a ticket queue',
    ],
    programs: ['Malta MEIN', 'Turkey citizenship', 'Premium Caribbean'],
    ctaMessage: 'Premium advisory inquiry',
  },
];

const comparisonData = [
  {
    archetype: 'Emerging Market Entrepreneur',
    programType: 'Caribbean CBI',
    budget: '$100K–$200K',
    timeline: '3–6 months',
    keyBenefit: 'Visa-free travel to 140+ countries',
  },
  {
    archetype: 'Family Legacy Planner',
    programType: 'EU + Caribbean mix',
    budget: '$200K–$1M+',
    timeline: '6–14 months',
    keyBenefit: 'Generational citizenship & EU access',
  },
  {
    archetype: 'Digital Nomad / Remote Executive',
    programType: 'Golden Visa / RV',
    budget: '$250K–$500K',
    timeline: '3–8 months',
    keyBenefit: 'EU residency with lifestyle freedom',
  },
  {
    archetype: "Global Wealth Manager's Client",
    programType: 'Premium CBI / MEIN',
    budget: '$500K–$1M+',
    timeline: '6–18 months',
    keyBenefit: 'White-glove discretion & legacy planning',
  },
];

const WhoWeServe = () => {
  return (
    <Layout>
      <SEOHead
        title="Who We Serve — Investment Migration for Entrepreneurs, Families & Nomads | Passport Capital"
        description="Whether you're an entrepreneur, a family planner, a digital nomad, or a wealth manager's client — we tailor our advisory to your world."
        path="/who-we-serve"
      />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-wide text-center">
          <div className="section-label">
            <Users className="w-4 h-4" />
            <span>Client Archetypes</span>
          </div>
          <h1 className="section-title">Who We Serve</h1>
          <p className="section-subtitle max-w-3xl">
            Whether you're an entrepreneur seeking global mobility, a family planning for the next generation, or a wealth manager's client — we tailor our advisory to your world.
          </p>
          <div className="divider-gold mx-auto mt-6" />
        </div>
      </section>

      {profiles.map((profile, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={profile.name}
            className={`py-20 ${isEven ? 'bg-gradient-to-b from-cream to-white' : 'bg-card'}`}
          >
            <div className="container-wide">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                <div className={!isEven ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-6 shadow-gold">
                    <profile.icon className="w-8 h-8 text-sapphire-deep" />
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {profile.name}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className="badge-gold">{profile.region}</Badge>
                    <Badge className="badge-premium">{profile.netWorth}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {profile.motivators.map((motivator) => (
                      <span
                        key={motivator}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                      >
                        {motivator}
                      </span>
                    ))}
                  </div>

                  <div className="mb-8">
                    <h4 className="font-display text-lg font-semibold text-foreground mb-4">
                      This is for you if:
                    </h4>
                    <ul className="space-y-3">
                      {profile.ifYou.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="gradient-royal text-primary-foreground rounded-xl shadow-royal hover:shadow-royal-lg transition-all"
                  >
                    <a
                      href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Hi, I'm interested in ${profile.ctaMessage}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="mr-2 w-4 h-4" />
                      Get Advisory
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>

                <div className={!isEven ? 'lg:order-1' : ''}>
                  <Card className="card-premium p-1">
                    <CardContent className="p-8">
                      <h4 className="font-display text-lg font-semibold text-foreground mb-4">
                        Recommended Programs
                      </h4>
                      <div className="space-y-3">
                        {profile.programs.map((program) => (
                          <div
                            key={program}
                            className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold to-gold-dark flex-shrink-0" />
                            <span className="font-medium text-foreground">{program}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-gold/5 to-accent/5 border border-gold/10">
                        <p className="text-sm font-medium text-gold-dark mb-1">Budget Range</p>
                        <p className="font-display text-2xl font-bold text-foreground">{profile.netWorth}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="container-wide">
          <div className="section-header">
            <div className="section-label">
              <TrendingUp className="w-4 h-4" />
              <span>At a Glance</span>
            </div>
            <h2 className="section-title">Archetype Comparison</h2>
            <p className="section-subtitle">
              Find the right program type, budget, and timeline for your profile.
            </p>
            <div className="divider-gold mx-auto mt-6" />
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="card-premium overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5 hover:bg-primary/5">
                    <TableHead className="font-semibold text-foreground">Archetype</TableHead>
                    <TableHead className="font-semibold text-foreground">Best Program Type</TableHead>
                    <TableHead className="font-semibold text-foreground">Budget Range</TableHead>
                    <TableHead className="font-semibold text-foreground">Timeline</TableHead>
                    <TableHead className="font-semibold text-foreground">Key Benefit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row) => (
                    <TableRow key={row.archetype}>
                      <TableCell className="font-medium text-foreground">{row.archetype}</TableCell>
                      <TableCell>{row.programType}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="badge-gold">{row.budget}</Badge>
                      </TableCell>
                      <TableCell>{row.timeline}</TableCell>
                      <TableCell className="text-muted-foreground">{row.keyBenefit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container-wide text-center">
          <div className="section-label text-primary-foreground/80">
            <TrendingUp className="w-4 h-4" />
            <span>Find Your Path</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Not Sure Which Profile Fits You?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Take our quick qualifier to discover the ideal program for your goals, budget, and timeline.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-background text-primary hover:bg-background/90 shadow-lg"
          >
            <Link to="/#lead-qualifier">
              Find Your Path
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default WhoWeServe;
