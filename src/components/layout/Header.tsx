import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrograms } from '@/hooks/usePrograms';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { TelegramIcon } from '@/components/shared/TelegramIcon';
import { WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/programs', hasMegaMenu: true },
  { name: 'Compare', href: '/compare' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
];

const regionDefs = [
  { name: 'Caribbean', flag: '🏝️', key: 'caribbean' },
  { name: 'Europe', flag: '🇪🇺', key: 'europe' },
  { name: 'Middle East', flag: '🏜️', key: 'middle-east' },
  { name: 'Pacific', flag: '🌴', key: 'pacific' },
  { name: 'Asia', flag: '🇰🇭', key: 'asia' },
  { name: 'Americas', flag: '🌎', key: 'americas' },
  { name: 'Africa', flag: '🌍', key: 'africa' },
];

const Header = () => {
  const { data: programs = [] } = usePrograms();

  const regions = regionDefs.map(r => ({
    ...r,
    count: programs.filter(p => p.region === r.key).length,
  }));

  const popularPrograms = programs.filter(p => p.isPopular).slice(0, 4);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
        setMegaMenuOpen(false);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setMegaMenuOpen(false);
    if (megaMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [megaMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled || !isHomePage
          ? 'bg-card/95 backdrop-blur-xl border-b border-border shadow-elegant'
          : 'bg-gradient-to-b from-sapphire-deep/80 via-sapphire-deep/40 to-transparent backdrop-blur-sm'
      }`}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
              scrolled || !isHomePage ? 'gradient-royal shadow-royal' : 'bg-white/10 backdrop-blur-sm border border-white/20'
            }`}>
              <Globe className={`w-5 h-5 ${scrolled || !isHomePage ? 'text-primary-foreground' : 'text-white'}`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-xl font-bold transition-colors ${
                scrolled || !isHomePage ? 'text-foreground' : 'text-white'
              }`}>
                Passport Capital
              </span>
              <span className={`text-2xs uppercase tracking-widest ${
                scrolled || !isHomePage ? 'text-muted-foreground' : 'text-white/80'
              }`}>
                Global Citizenship
              </span>
            </div>
          </Link>

          <div
            className={`hidden lg:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full transition-all duration-300 ${
              scrolled || !isHomePage
                ? 'bg-muted/60 backdrop-blur-xl border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                : 'bg-white/10 backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.15)]'
            }`}
            style={!scrolled && isHomePage ? { textShadow: '0 1px 2px rgba(0,0,0,0.3)' } : undefined}
          >
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasMegaMenu && setMegaMenuOpen(true)}
                onMouseLeave={() => item.hasMegaMenu && setMegaMenuOpen(false)}
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? scrolled || !isHomePage
                        ? 'text-primary bg-primary/10 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)]'
                        : 'text-white bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.1)]'
                      : scrolled || !isHomePage
                        ? 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                        : 'text-white hover:bg-white/15 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                  }`}
                >
                  {item.name}
                  {item.hasMegaMenu && <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
                </Link>

                {item.hasMegaMenu && megaMenuOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[700px] animate-fade-in"
                    style={{ animationDuration: '0.2s' }}
                  >
                    <div className="bg-card rounded-2xl border border-border shadow-elegant overflow-hidden">
                      <div className="grid grid-cols-5 gap-0">
                        <div className="col-span-2 p-6 bg-muted/30">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                            Browse by Region
                          </h4>
                          <div className="space-y-2">
                            {regions.map((region) => (
                              <Link
                                key={region.name}
                                to={`/programs?region=${region.name.toLowerCase().replace(' ', '-')}`}
                                onClick={() => setMegaMenuOpen(false)}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{region.flag}</span>
                                  <span className="font-medium text-foreground">{region.name}</span>
                                </div>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                  {region.count} programs
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="col-span-3 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Popular Programs
                            </h4>
                            <Link
                              to="/programs"
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              View All <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {popularPrograms.map((program) => (
                              <Link
                                key={program.id}
                                to={`/programs/${program.id}`}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                              >
                                <span className="text-2xl">{program.flag}</span>
                                <div>
                                  <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                                    {program.country}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    From ${(program.minInvestment / 1000).toFixed(0)}K
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+244787676544"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled || !isHomePage
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-white hover:text-white/90'
              }`}
              style={!scrolled && isHomePage ? { textShadow: '0 1px 3px rgba(0,0,0,0.4)' } : undefined}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+244 787 676 544</span>
            </a>

            <Button
              asChild
              className={`rounded-xl shadow-royal transition-all duration-300 hover:-translate-y-0.5 ${
                scrolled || !isHomePage
                  ? 'gradient-royal text-primary-foreground'
                  : 'bg-white text-royal hover:bg-white/95'
              }`}
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Us
              </a>
            </Button>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled || !isHomePage
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-white hover:text-white/90'
              }`}
            >
              <TelegramIcon className="w-4 h-4" />
              Telegram
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={`lg:hidden p-2.5 rounded-xl transition-colors ${
              scrolled || !isHomePage
                ? 'text-foreground hover:bg-muted'
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-card/95 backdrop-blur-xl animate-fade-in">
            <div className="flex flex-col gap-1 mb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <a
                href="tel:+244787676544"
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground"
              >
                <Phone className="w-5 h-5" />
                <span>+244 787 676 544</span>
              </a>
              <div className="flex gap-3 mx-4">
                <Button
                  asChild
                  className="flex-1 gradient-royal text-primary-foreground rounded-xl"
                >
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TelegramIcon className="w-4 h-4 mr-2" />
                    Telegram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
