import { Check, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Program } from '@/data/programs';

interface AboutCountryProps {
  program: Program;
}

const AboutCountry = ({ program }: AboutCountryProps) => {
  return (
    <div className="space-y-6">
      {program.aboutCountry && (
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-3">
            About {program.country}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {program.aboutCountry}
          </p>
        </div>
      )}

      {program.legalFramework && (
        <div className="p-4 bg-secondary rounded-lg">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Legal Framework</p>
              <p className="text-sm text-muted-foreground">{program.legalFramework}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-3">
          Program Overview
        </h3>
        <p className="text-muted-foreground mb-4">
          {program.description}
        </p>

        <div className="space-y-2">
          {program.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent shrink-0" />
              <span className="text-foreground text-sm">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">
          {program.programType === 'citizenship' ? 'Citizenship' : 'Residency'}
        </Badge>
        <Badge variant="outline" className="capitalize">
          {program.region.replace('-', ' ')}
        </Badge>
        {program.passportValidity && (
          <Badge variant="outline">
            Passport valid {program.passportValidity}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AboutCountry;
