import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TelegramIcon } from '@/components/shared/TelegramIcon';
import { WHATSAPP_LINK, TELEGRAM_LINK, CONTACT_EMAIL } from '@/lib/constants';
import navyLeatherTexture from '@/assets/navy-leather-texture.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubscribing(true);
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    setSubscribing(false);
    if (error) {
      if (error.code === '23505') {
        toast.info('You\'re already subscribed!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } else {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'All Programs', href: '/programs' },
    { name: 'Compare Programs', href: '/compare' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Our Services', href: '/services' },
    { name: 'About Us', href: '/about' },
  ];

  const regions = [
    { name: 'Caribbean Programs', href: '/programs?region=caribbean' },
    { name: 'European Programs', href: '/programs?region=europe' },
    { name: 'Middle East Programs', href: '/programs?region=middle-east' },
    { name: 'Pacific Programs', href: '/programs?region=pacific' },
  ];

  const cryptos = ['BTC', 'ETH', 'USDT', 'SOL'];

  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${navyLeatherTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sapphire-deep/20 via-transparent to-sapphire-deep/30" />

      <div className="border-b border-white/10 relative z-10">
        <div className="container-wide py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Stay Informed
              </h3>
              <p className="text-white/70">
                Get exclusive updates on new programs, policy changes, and investment opportunities.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-colors"
              />
              <Button type="submit" disabled={subscribing} className="gradient-gold text-accent-foreground px-6 rounded-xl hover:shadow-gold transition-all">
                {subscribing ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-wide py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal to-sapphire flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold block">
                  Passport Capital
                </span>
                <span className="text-2xs uppercase tracking-widest text-white/50">
                  Global Citizenship
                </span>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Your trusted partner for Citizenship and Residency by Investment.
              Unlock global mobility and secure your family's future with expert guidance.
            </p>

            <div>
              <p className="text-xs uppercase tracking-wider text-white/40 mb-3">
                We Accept Cryptocurrency
              </p>
              <div className="flex flex-wrap gap-2">
                {cryptos.map((crypto) => (
                  <span
                    key={crypto}
                    className="px-3 py-1.5 text-xs font-medium bg-white/5 rounded-lg border border-white/10 text-white/70"
                  >
                    {crypto}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">✓</span>
                </div>
                <span className="text-xs">Licensed Agent</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">🔒</span>
                </div>
                <span className="text-xs">Secure Payments</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90 mb-6">
              By Region
            </h4>
            <ul className="space-y-3">
              {regions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90 mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">WhatsApp</p>
                    <p className="text-xs text-white/50">+244 787 676 544</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <TelegramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Telegram</p>
                    <p className="text-xs text-white/50">@passportcapital</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Email</p>
                    <p className="text-xs text-white/50">{CONTACT_EMAIL}</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80">Office</p>
                  <p className="text-xs text-white/50">Global Consultancy Services</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 relative z-10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {currentYear} Passport Capital. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
    </footer>
  );
};

export default Footer;
