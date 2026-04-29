import { Clock, Globe, Building, DollarSign, Users, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Program } from '@/data/programs';
import { formatCurrency } from '@/lib/constants';

interface ProgramOverviewProps {
  program: Program;
}

const ProgramOverview = ({ program }: ProgramOverviewProps) => {
  const stats = [
    {
      icon: Clock,
      label: 'Processing Time',
      value: program.processingTime,
      color: 'text-primary',
    },
    {
      icon: Globe,
      label: 'Visa-Free Countries',
      value: `${program.visaFreeCountries}+ countries`,
      color: 'text-accent',
    },
    {
      icon: Building,
      label: 'Investment Type',
      value: program.investmentType,
      color: 'text-primary',
    },
    {
      icon: DollarSign,
      label: 'Minimum Investment',
      value: formatCurrency(program.minInvestment),
      color: 'text-accent',
    },
    {
      icon: Users,
      label: 'Family Dependents',
      value: program.familyInclusion ? 'Included' : 'Not included',
      color: 'text-primary',
    },
    {
      icon: MapPin,
      label: 'Physical Presence',
      value: program.physicalPresence,
      color: 'text-accent',
    },
  ];

  return (
    <section id="program-details" className="py-12 bg-background">
      <div className="container-wide">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Program Overview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-royal transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {stat.label}
                </p>
                <p className="font-semibold text-foreground text-sm">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;
