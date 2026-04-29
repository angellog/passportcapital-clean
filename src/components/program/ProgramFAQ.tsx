import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Program } from '@/data/programs';

interface ProgramFAQProps {
  program: Program;
}

const defaultFAQs = [
  {
    question: 'What is the minimum investment required?',
    answer: 'The minimum investment varies by program. Contact us for detailed pricing based on your specific situation and family size.',
  },
  {
    question: 'Can I include my family in the application?',
    answer: 'Yes, most programs allow you to include your spouse, dependent children, and in some cases, parents and siblings.',
  },
  {
    question: 'Is the process fully remote?',
    answer: 'Most programs can be completed 100% remotely without requiring a visit to the country.',
  },
  {
    question: 'How fast can I get citizenship/residency?',
    answer: 'Processing times vary by program, ranging from a few weeks to several months depending on the country and investment option chosen.',
  },
  {
    question: 'Is dual citizenship allowed?',
    answer: 'Most citizenship by investment programs allow dual citizenship, meaning you can keep your current nationality.',
  },
];

const ProgramFAQ = ({ program }: ProgramFAQProps) => {
  const faqs = program.faqs || defaultFAQs;

  return (
    <section className="py-12 bg-background">
      <div className="container-wide">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Common questions about the {program.country} {program.programType} program
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50 text-left">
                  <span className="font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2">
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ProgramFAQ;
