import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { TelegramIcon } from '@/components/shared/TelegramIcon';
import { WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={TELEGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on Telegram"
        className="w-12 h-12 flex items-center justify-center bg-[#0088cc] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        style={{ boxShadow: '0 4px 20px rgba(0, 136, 204, 0.4)' }}
      >
        <TelegramIcon className="w-6 h-6" />
      </a>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="w-12 h-12 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
        style={{ boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)' }}
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </div>
  );
};

FloatingButtons.displayName = 'FloatingButtons';

export default FloatingButtons;
