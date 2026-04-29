import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TelegramIcon } from '@/components/shared';
import { WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';
import { Program } from '@/data/programs';

interface ProgramCTAProps {
  program: Program;
}

const ProgramCTA = ({ program }: ProgramCTAProps) => {
  return (
    <section className="py-16 gradient-royal relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url('${program.image}')` }}
      />

      <div className="container-wide relative z-10 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Start Your {program.country} Journey Today
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Take the first step towards your {program.programType === 'citizenship' ? 'second citizenship' : 'residency'} with a free consultation.
          Our experts will guide you through every step of the process.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-background text-primary hover:bg-background/90"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 w-5 h-5" />
              Chat on WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90"
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <TelegramIcon className="mr-2 w-5 h-5" />
              Chat on Telegram
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link to="/programs">
              View All Programs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>

        <p className="text-sm text-primary-foreground/60 mt-6">
          Free initial consultation • No obligation • Expert guidance
        </p>
      </div>
    </section>
  );
};

export default ProgramCTA;
