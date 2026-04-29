import { Mail, Phone } from 'lucide-react';
import { TelegramIcon } from '@/components/shared/TelegramIcon';
import { WHATSAPP_LINK, TELEGRAM_LINK, CONTACT_EMAIL } from '@/lib/constants';

export function LegalContactCard() {
  return (
    <div className="bg-muted/30 border border-border rounded-2xl p-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Us</h2>
      <p className="text-muted-foreground mb-6">
        If you have questions about our policies, please contact us:
      </p>
      <div className="space-y-3">
        <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
          <Mail className="w-5 h-5 text-primary" />
          {CONTACT_EMAIL}
        </a>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
          <Phone className="w-5 h-5 text-primary" />
          +244 787 676 544 (WhatsApp)
        </a>
        <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
          <TelegramIcon className="w-5 h-5 text-primary" />
          @passportcapital (Telegram)
        </a>
      </div>
    </div>
  );
}
