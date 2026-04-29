import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { TelegramIcon } from '@/components/shared';
import { WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';
import { Program } from '@/data/programs';

interface ProgramHeroProps {
  program: Program;
}

const ProgramHero = ({ program }: ProgramHeroProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${program.image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

      <div className="relative z-10 container-wide pb-12 pt-32">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-background/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm capitalize">
            {program.region.replace('-', ' ')}
          </Badge>
          <Badge className="gradient-royal text-primary-foreground capitalize">
            {program.programType} by Investment
          </Badge>
          {program.isPopular && (
            <Badge className="bg-accent text-accent-foreground">
              <TrendingUp className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {program.isNew && (
            <Badge className="bg-primary text-primary-foreground">
              <Sparkles className="w-3 h-3 mr-1" />
              New Program
            </Badge>
          )}
          {program.isCryptoFriendly && (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              ₿ Crypto-Friendly
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{program.flag}</span>
          <div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
              {program.country}
            </h1>
            {program.tagline && (
              <p className="text-lg text-primary-foreground/80 mt-2">
                {program.tagline}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <Button
            asChild
            size="lg"
            className="gradient-royal text-primary-foreground shadow-royal"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Start Your Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90"
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <TelegramIcon className="mr-2 w-5 h-5" />
              Telegram
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background/20"
            onClick={() => document.getElementById('program-details')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Program Details
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramHero;
