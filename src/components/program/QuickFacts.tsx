import { Clock, Languages, Coins, Users } from 'lucide-react';
import { Program } from '@/data/programs';

interface QuickFactsProps {
  program: Program;
}

const QuickFacts = ({ program }: QuickFactsProps) => {
  const facts = [
    { icon: Clock, label: 'Timezone', value: program.timezone || 'N/A' },
    { icon: Languages, label: 'Language', value: program.language || 'N/A' },
    { icon: Coins, label: 'Currency', value: program.currency || 'N/A' },
    { icon: Users, label: 'Population', value: program.population || 'N/A' },
  ];

  return (
    <section className="py-6 bg-secondary border-b border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {facts.map((fact, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <fact.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{fact.label}</p>
                <p className="text-sm font-medium text-foreground">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickFacts;
