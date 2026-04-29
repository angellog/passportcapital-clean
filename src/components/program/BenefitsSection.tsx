import { Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { iconMap } from '@/lib/iconMap';
import { Program } from '@/data/programs';

interface BenefitsSectionProps {
  program: Program;
}

const defaultBenefits = [
  { title: 'Simple Process', description: 'Remote processing with no interview or residency required', icon: 'Zap' },
  { title: 'Global Mobility', description: 'Visa-free access to multiple countries worldwide', icon: 'Globe' },
  { title: 'Family Security', description: 'Include spouse and dependent children in your application', icon: 'Users' },
];

const BenefitsSection = ({ program }: BenefitsSectionProps) => {
  const benefits = program.keyBenefits || defaultBenefits;

  return (
    <section className="py-12 bg-secondary">
      <div className="container-wide">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
          Key Benefits
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Why investors choose the {program.country} {program.programType} program
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Globe;
            return (
              <Card key={index} className="hover:shadow-royal transition-all duration-300 border-border hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full gradient-royal flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
