import { Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CONSULTATION_FEE, COMMITMENT_FEE_RATE } from '@/lib/constants';
import { Program, TimelineStep } from '@/data/programs';

interface ApplicationTimelineProps {
  program: Program;
}

const defaultTimeline: TimelineStep[] = [
  { step: 1, title: 'Initial Consultation', duration: '1-2 days', description: 'Free eligibility assessment' },
  { step: 2, title: 'Document Preparation', duration: '2-4 weeks', description: 'Gather required documents' },
  { step: 3, title: 'Application Submission', duration: '1-2 weeks', description: `Submit with fees ($${CONSULTATION_FEE} + ${(COMMITMENT_FEE_RATE * 100).toFixed(1)}%)` },
  { step: 4, title: 'Due Diligence', duration: '4-8 weeks', description: 'Government review process' },
  { step: 5, title: 'Approval & Investment', duration: '2-4 weeks', description: 'Complete investment payment' },
  { step: 6, title: 'Citizenship Granted', duration: '1-2 weeks', description: 'Receive passport & certificate' },
];

const ApplicationTimeline = ({ program }: ApplicationTimelineProps) => {
  const timeline = program.timeline || defaultTimeline;

  return (
    <section className="py-12 bg-background">
      <div className="container-wide">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
          Application Timeline
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Your journey to {program.country} {program.programType}
        </p>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {timeline.map((step, index) => {
              const isSubmissionStep = step.title.toLowerCase().includes('submission');

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`p-6 bg-card border border-border rounded-lg shadow-sm hover:shadow-royal transition-shadow duration-300 ${
                      isSubmissionStep ? 'border-accent/50 bg-accent/5' : ''
                    }`}>
                      <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.duration}
                        </Badge>
                        {isSubmissionStep && (
                          <Badge className="bg-accent text-accent-foreground text-xs">
                            <DollarSign className="w-3 h-3 mr-1" />
                            Fees Due
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full gradient-royal text-primary-foreground font-bold shrink-0">
                    {step.step}
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationTimeline;
