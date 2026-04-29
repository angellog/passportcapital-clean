import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TelegramIcon, WhatsAppIcon } from '@/components/shared';
import { WHATSAPP_LINK, TELEGRAM_LINK, CONTACT_EMAIL } from '@/lib/constants';
import navyLeatherTexture from '@/assets/navy-leather-texture.png';

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${navyLeatherTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sapphire-deep/20 via-transparent to-sapphire-deep/30" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Secure Your{' '}
            <span className="text-accent">Second Citizenship?</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Take the first step towards global freedom. Our experts are ready to guide you
            through the entire process.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 shadow-gold"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="mr-2 w-5 h-5" />
                WhatsApp Us Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90 text-lg px-8 py-6"
            >
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <TelegramIcon className="mr-2 w-5 h-5" />
                Telegram
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
            >
              <a href={`mailto:${CONTACT_EMAIL}`}>
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
