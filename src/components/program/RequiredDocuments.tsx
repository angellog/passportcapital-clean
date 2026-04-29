import { FileText, Check } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Program, DocumentCategory } from '@/data/programs';

interface RequiredDocumentsProps {
  program: Program;
}

const defaultDocuments: DocumentCategory[] = [
  {
    category: 'Personal & Identification',
    documents: ['Valid passport (certified copy)', 'Birth certificate', 'Passport-sized photos', 'National ID card', 'Proof of address'],
  },
  {
    category: 'Background Check',
    documents: ['Police clearance certificate', 'Military records (if applicable)', 'Professional reference letters'],
  },
  {
    category: 'Financial Documents',
    documents: ['Bank reference letter', 'Bank statements (6-12 months)', 'Source of funds declaration', 'Tax returns or income proof'],
  },
  {
    category: 'Marital Status',
    documents: ['Marriage certificate (if married)', 'Divorce decree (if applicable)', 'Spouse documents', 'Children birth certificates'],
  },
];

const RequiredDocuments = ({ program }: RequiredDocumentsProps) => {
  const documents = program.requiredDocuments || defaultDocuments;

  return (
    <section className="py-12 bg-background">
      <div className="container-wide">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
          Required Documents
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Documents needed for your {program.country} {program.programType} application
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {documents.map((category, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg overflow-hidden bg-card"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-display font-semibold text-foreground">
                      {category.category}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ul className="space-y-2 pt-2">
                    {category.documents.map((doc, docIndex) => (
                      <li key={docIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default RequiredDocuments;
