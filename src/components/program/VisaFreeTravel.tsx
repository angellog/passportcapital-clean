import { useState } from 'react';
import { Globe, Plane } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Program } from '@/data/programs';

interface VisaFreeTravelProps {
  program: Program;
}

const VisaFreeTravel = ({ program }: VisaFreeTravelProps) => {
  const regions = program.visaFreeByRegion || [];
  const [activeRegion, setActiveRegion] = useState(regions[0]?.region || '');

  if (regions.length === 0) {
    return (
      <section className="py-12 bg-secondary">
        <div className="container-wide text-center">
          <div className="w-16 h-16 rounded-full gradient-royal flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Visa-Free Travel
          </h2>
          <p className="text-4xl font-bold text-primary mb-2">
            {program.visaFreeCountries}+
          </p>
          <p className="text-muted-foreground">
            Countries with visa-free or visa-on-arrival access
          </p>
        </div>
      </section>
    );
  }

  const activeCountries = regions.find(r => r.region === activeRegion)?.countries || [];

  return (
    <section className="py-12 bg-secondary">
      <div className="container-wide">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full gradient-royal flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Visa-Free Travel Access
          </h2>
          <p className="text-4xl font-bold text-primary mb-2">
            {program.visaFreeCountries}+
          </p>
          <p className="text-muted-foreground">
            Countries with visa-free or visa-on-arrival access
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {regions.map((region) => (
            <Button
              key={region.region}
              variant={activeRegion === region.region ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveRegion(region.region)}
              className={activeRegion === region.region ? 'gradient-royal text-primary-foreground' : ''}
            >
              {region.region}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {activeCountries.map((country, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
            >
              <span className="text-sm text-foreground">{country.name}</span>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  country.type === 'VF'
                    ? 'bg-accent/20 text-accent-foreground'
                    : country.type === 'VoA'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {country.type}
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground text-xs">VF</Badge>
            <span>Visa Free</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">VoA</Badge>
            <span>Visa on Arrival</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">eTA</Badge>
            <span>Electronic Travel Auth</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaFreeTravel;
