import { useState } from 'react';
import { X, Plus, Globe, Clock, DollarSign, Users, Check, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency, WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';
import { TelegramIcon } from '@/components/shared/TelegramIcon';
import { Program } from '@/data/programs';
import { usePrograms } from '@/hooks/usePrograms';

const Compare = () => {
  const { data: programs = [] } = usePrograms();
  const [selectedPrograms, setSelectedPrograms] = useState<(Program | null)[]>([null, null, null, null]);

  const addProgram = (index: number, programId: string) => {
    const program = programs.find((p) => p.id === programId) || null;
    const newSelected = [...selectedPrograms];
    newSelected[index] = program;
    setSelectedPrograms(newSelected);
  };

  const removeProgram = (index: number) => {
    const newSelected = [...selectedPrograms];
    newSelected[index] = null;
    setSelectedPrograms(newSelected);
  };

  const activePrograms = selectedPrograms.filter(Boolean) as Program[];
  const availablePrograms = programs.filter(
    (p) => !selectedPrograms.some((sp) => sp?.id === p.id)
  );

  return (
    <Layout>
      <SEOHead
        title="Compare CBI & RBI Programs Side by Side | Passport Capital"
        description="Compare citizenship and residency by investment programs side by side. Evaluate investment costs, processing times, and benefits."
        path="/compare"
      />
      <section className="py-16 gradient-royal">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Compare Programs
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Compare up to 4 citizenship programs side-by-side to find the best fit for your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {selectedPrograms.map((program, index) => (
              <Card key={index} className="border-2 border-dashed border-border overflow-hidden">
                {program ? (
                  <>
                    <div className="relative h-24 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.country}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 bg-background/80 hover:bg-background"
                        onClick={() => removeProgram(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <span className="absolute bottom-2 right-2 text-2xl drop-shadow-lg">{program.flag}</span>
                    </div>
                    <CardContent className="p-3">
                      <p className="font-semibold text-sm">{program.country}</p>
                      <p className="text-primary font-bold text-lg">{formatCurrency(program.minInvestment)}</p>
                      <p className="text-xs text-muted-foreground capitalize">{program.programType}</p>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4">
                    <Select onValueChange={(v) => addProgram(index, v)}>
                      <SelectTrigger className="border-none bg-secondary">
                        <SelectValue placeholder={<span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Program</span>} />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePrograms.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.flag} {p.country} ({p.programType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {activePrograms.length >= 2 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    {activePrograms.map((p) => (
                      <th key={p.id} className="text-center p-4 min-w-[200px]">
                        <span className="text-2xl">{p.flag}</span>
                        <p className="font-display font-semibold mt-1">{p.country}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <CompareRow label="Program Type" values={activePrograms.map((p) => p.programType.charAt(0).toUpperCase() + p.programType.slice(1))} />
                  <CompareRow label="Investment" icon={DollarSign} values={activePrograms.map((p) => formatCurrency(p.minInvestment))} highlight />
                  <CompareRow label="Processing Time" icon={Clock} values={activePrograms.map((p) => p.processingTime)} />
                  <CompareRow label="Visa-Free Countries" icon={Globe} values={activePrograms.map((p) => p.visaFreeCountries.toString())} />
                  <CompareRow label="Family Included" icon={Users} values={activePrograms.map((p) => p.familyInclusion ? '✓' : '✗')} />
                  <CompareRow label="Dual Citizenship" icon={Check} values={activePrograms.map((p) => p.dualCitizenship ? '✓' : '✗')} />
                  <CompareRow label="Crypto Friendly" values={activePrograms.map((p) => p.isCryptoFriendly ? '✓ Yes' : '—')} />
                  <CompareRow label="Physical Presence" values={activePrograms.map((p) => p.physicalPresence)} />
                  <CompareRow label="Investment Type" values={activePrograms.map((p) => p.investmentType)} />
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary rounded-lg">
              <p className="text-muted-foreground text-lg mb-2">Select at least 2 programs to compare</p>
              <p className="text-sm text-muted-foreground">Use the dropdowns above to add programs</p>
            </div>
          )}

          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gradient-royal text-primary-foreground">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Get Expert Advice <ArrowRight className="ml-2 w-5 h-5" />
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

const CompareRow = ({ label, icon: Icon, values, highlight }: { label: string; icon?: any; values: string[]; highlight?: boolean }) => (
  <tr className={`border-b border-border ${highlight ? 'bg-royal-light/30' : ''}`}>
    <td className="p-4 font-medium text-foreground flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-primary" />}
      {label}
    </td>
    {values.map((value, i) => (
      <td key={i} className={`p-4 text-center ${highlight ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
        {value}
      </td>
    ))}
  </tr>
);

export default Compare;
