import { User, Shield, Heart, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Program } from '@/data/programs';

interface EligibilityRequirementsProps {
  program: Program;
}

const defaultEligibility = {
  age: 'Primary applicant must be 18 years or older',
  character: 'Clean criminal record with no convictions',
  health: 'Good health status (medical certificate required)',
  fundsProof: 'Legitimate source of funds documentation',
};

const EligibilityRequirements = ({ program }: EligibilityRequirementsProps) => {
  const eligibility = program.eligibility || defaultEligibility;

  const requirements = [
    { icon: User, title: 'Age Requirement', description: eligibility.age },
    { icon: Shield, title: 'Good Character', description: eligibility.character },
    { icon: Heart, title: 'Health Status', description: eligibility.health },
    { icon: Wallet, title: 'Source of Funds', description: eligibility.fundsProof },
  ];

  return (
    <section className="py-12 bg-secondary">
      <div className="container-wide">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
          Eligibility Requirements
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Basic criteria to qualify for the {program.country} {program.programType} program
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {requirements.map((req, index) => (
            <Card key={index} className="text-center hover:shadow-royal transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <req.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {req.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {req.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EligibilityRequirements;
