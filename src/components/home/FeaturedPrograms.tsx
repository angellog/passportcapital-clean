import { ArrowRight, Globe, Clock, Users, Check, Sparkles, TrendingUp, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/data/programs';
import { usePrograms } from '@/hooks/usePrograms';

const FeaturedPrograms = () => {
  const { data: programs = [] } = usePrograms();

  const featuredPrograms = programs
    .filter((p) => p.isPopular || p.isNew)
    .slice(0, 6);

  return (
    <section id="featured-programs" className="py-24 bg-background relative">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="container-wide relative">
        <div className="section-header">
          <div className="section-label">
            <MapPin className="w-4 h-4" />
            <span>Popular Destinations</span>
          </div>
          <h2 className="section-title">Featured Citizenship Programs</h2>
          <p className="section-subtitle">
            Explore our most sought-after citizenship and residency programs,
            each offering unique benefits and investment opportunities.
          </p>
          <div className="divider-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredPrograms.map((program, index) => (
            <Card
              key={program.id}
              className="group card-premium overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={program.image}
                  alt={`${program.country} citizenship by investment program`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {program.isPopular && (
                    <Badge className="bg-gold text-accent-foreground border-0 shadow-gold">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {program.isNew && (
                    <Badge className="bg-primary text-primary-foreground border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  )}
                  {program.isCryptoFriendly && (
                    <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm border border-border">
                      ₿ Crypto
                    </Badge>
                  )}
                </div>

                <div className="absolute -bottom-3 right-4 text-5xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {program.flag}
                </div>
              </div>

              <CardContent className="p-6 pt-8">
                <div className="mb-4">
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">
                    {program.country}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize font-normal">
                      {program.region.replace('-', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize font-normal">
                      {program.programType}
                    </Badge>
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-border">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Investment from
                  </span>
                  <p className="text-2xl font-bold text-primary font-display">
                    {formatCurrency(program.minInvestment)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{program.visaFreeCountries}+</p>
                      <p className="text-xs text-muted-foreground">Countries</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-gold-dark" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{program.processingTime}</p>
                      <p className="text-xs text-muted-foreground">Processing</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 mb-5">
                  {program.highlights.slice(0, 2).map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-foreground/80">{highlight}</span>
                    </div>
                  ))}
                </div>

                {program.familyInclusion && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5 pb-5 border-b border-border">
                    <Users className="w-4 h-4" />
                    <span>Family members included</span>
                  </div>
                )}

                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  <Link to={`/programs/${program.id}`}>
                    View Program Details
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="gradient-royal text-primary-foreground rounded-xl shadow-royal hover:shadow-royal-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <Link to="/programs">
              View All Programs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
