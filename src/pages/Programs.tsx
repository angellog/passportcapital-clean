import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { regions, programTypes, WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';
import { TelegramIcon } from '@/components/shared/TelegramIcon';
import { ProgramCard } from '@/components/shared/ProgramCard';
import { usePrograms } from '@/hooks/usePrograms';

const Programs = () => {
  const { data: programs = [] } = usePrograms();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState<'price' | 'visa' | 'time'>('price');

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    if (regionId === 'all') {
      searchParams.delete('region');
    } else {
      searchParams.set('region', regionId);
    }
    setSearchParams(searchParams, { replace: true });
  };

  useEffect(() => {
    const regionFromUrl = searchParams.get('region') || 'all';
    setSelectedRegion(regionFromUrl);
  }, [searchParams]);

  const filteredPrograms = useMemo(() => {
    let filtered = programs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.country.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedRegion !== 'all') {
      filtered = filtered.filter((p) => p.region === selectedRegion);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.programType === selectedType);
    }

    switch (sortBy) {
      case 'price':
        filtered = [...filtered].sort((a, b) => a.minInvestment - b.minInvestment);
        break;
      case 'visa':
        filtered = [...filtered].sort((a, b) => b.visaFreeCountries - a.visaFreeCountries);
        break;
      case 'time':
        filtered = [...filtered].sort((a, b) => {
          const aNum = parseInt(a.processingTime) || 0;
          const bNum = parseInt(b.processingTime) || 0;
          return aNum - bNum;
        });
        break;
    }

    return filtered;
  }, [searchQuery, selectedRegion, selectedType, sortBy, programs]);

  return (
    <Layout>
      <SEOHead
        title="Browse CBI & RBI Programs | Passport Capital"
        description="Explore 27+ citizenship and residency by investment programs worldwide. Compare costs, processing times, and visa-free travel access."
        path="/programs"
      />
      <section className="py-16 gradient-royal relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80')`,
          }}
        />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Citizenship & Residency Programs
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Explore our comprehensive directory of investment migration programs
              across the Caribbean, Europe, Middle East, Africa, and Americas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 bg-background border-b border-border">
        <div className="container-wide">
          <div className="flex justify-center gap-2">
            {programTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? 'default' : 'outline'}
                size="lg"
                onClick={() => setSelectedType(type.id)}
                className={selectedType === type.id ? 'gradient-royal text-primary-foreground' : ''}
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-secondary border-b border-border sticky top-20 z-40">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleRegionChange(region.id)}
                  className={selectedRegion === region.id ? 'gradient-royal text-primary-foreground' : ''}
                >
                  {region.name}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort:</span>
              <div className="flex gap-1">
                {[
                  { id: 'price', label: 'Price' },
                  { id: 'visa', label: 'Visa-Free' },
                  { id: 'time', label: 'Speed' },
                ].map((option) => (
                  <Button
                    key={option.id}
                    variant={sortBy === option.id ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setSortBy(option.id as typeof sortBy)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredPrograms.length}</span> programs
            </p>
            <Button asChild variant="outline">
              <Link to="/compare">
                Compare Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No programs found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container-wide text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our experts can help you find the perfect program based on your specific needs and goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gradient-royal text-primary-foreground">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Get Free Consultation
              </a>
            </Button>
            <Button asChild size="lg" className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <TelegramIcon className="mr-2" />
                Telegram
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
