import { Link } from 'react-router-dom';
import { Globe, Clock, Users, Check, ArrowRight, TrendingUp, Sparkles, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Program } from '@/data/programs';
import { formatCurrency } from '@/lib/constants';

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card
      id={program.id}
      className="group hover:shadow-royal transition-all duration-300 border-border hover:border-primary/30 overflow-hidden"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={program.image}
          alt={`${program.country} destination`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          {program.isPopular && (
            <Badge className="bg-accent text-accent-foreground">
              <TrendingUp className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {program.isNew && (
            <Badge className="bg-primary text-primary-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              New
            </Badge>
          )}
          {program.isCryptoFriendly && (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              ₿ Crypto
            </Badge>
          )}
          {program.comingSoon && (
            <Badge className="bg-muted text-muted-foreground">
              <CalendarClock className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 right-3 text-3xl drop-shadow-lg">
          {program.flag}
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">
              {program.country}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs capitalize">
                {program.region.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {program.programType}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mb-3 pb-3 border-b border-border">
          <span className="text-sm text-muted-foreground">Investment from</span>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(program.minInvestment)}
          </p>
          <p className="text-xs text-muted-foreground">{program.investmentType}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-primary" />
            <span>{program.visaFreeCountries} visa-free</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{program.processingTime}</span>
          </div>
        </div>

        <div className="space-y-1.5 mb-3">
          {program.familyInclusion && (
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-accent" />
              <span className="text-foreground">Family included</span>
            </div>
          )}
          {program.dualCitizenship && (
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-accent" />
              <span className="text-foreground">Dual citizenship allowed</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{program.physicalPresence}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {program.highlights.slice(0, 3).map((highlight, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {highlight}
            </Badge>
          ))}
        </div>

        {program.comingSoon ? (
          <Button
            disabled
            className="w-full bg-muted text-muted-foreground cursor-not-allowed"
          >
            <CalendarClock className="mr-2 w-4 h-4" />
            Coming Soon
          </Button>
        ) : (
          <Button
            asChild
            className="w-full gradient-royal text-primary-foreground"
          >
            <Link to={`/programs/${program.id}`}>
              View Details
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
