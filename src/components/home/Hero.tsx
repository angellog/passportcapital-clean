import { ArrowRight, Shield, Globe, Clock, Play, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TelegramIcon } from '@/components/shared';
import { WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';
import { useEffect, useState, useRef } from 'react';

const useCountUp = (end: number, duration: number = 2000, shouldStart: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated) return;

    setHasAnimated(true);

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, shouldStart, hasAnimated]);

  return count;
};

const CountUpNumber = ({ end, shouldStart = true }: { end: number; shouldStart?: boolean }) => {
  const count = useCountUp(end, 1500, shouldStart);
  return <>{count}</>;
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToPrograms = () => {
    const element = document.getElementById('featured-programs');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: 99, suffix: '%', label: 'Success Rate', icon: Shield },
    { value: 20, suffix: '+', label: 'Countries', icon: Globe },
    { value: 30, suffix: '-Day', label: 'Fast Track', icon: Clock },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sapphire-deep via-royal/95 to-royal-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-sapphire-deep/80 via-sapphire-deep/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-80 h-80 rounded-full opacity-[0.07]"
            style={{
              background: `radial-gradient(circle, hsl(var(--gold) / 0.4) 0%, transparent 60%)`,
              left: `${15 + i * 30}%`,
              top: `${15 + (i % 2) * 40}%`,
              animation: `float ${10 + i * 3}s ease-in-out infinite`,
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>

      <div className="container-wide relative z-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Trusted by 5,000+ High-Net-Worth Families
              </span>
            </div>

            <h1
              className={`font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 transition-all duration-700 delay-100 hero-text-shadow ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Create Your{' '}
              <span className="relative inline-block">
                <span className="text-gradient-gold bg-gradient-to-r from-gold via-champagne to-gold bg-clip-text text-transparent drop-shadow-lg">
                  Plan B
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="hsl(var(--gold))" strokeWidth="3" strokeLinecap="round" className="opacity-70" />
                </svg>
              </span>
              <br />
              <span className="text-white">For Global Freedom</span>
            </h1>

            <p
              className={`text-lg md:text-xl text-white/95 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed transition-all duration-700 delay-200 hero-text-shadow-soft ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Secure second citizenship or residency for you and your family.
              Unlock visa-free travel to 140+ countries, tax optimization, and generational wealth protection.
            </p>

            <div
              className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark rounded-xl mb-10 shadow-gold transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="text-accent-foreground font-bold text-xl">
                Programs from $50K
              </span>
              <span className="w-px h-6 bg-accent-foreground/30" />
              <span className="text-accent-foreground/80 text-sm">
                Fast-track available
              </span>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-royal hover:bg-white/95 text-lg px-8 py-6 rounded-xl shadow-elegant hover:shadow-royal-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90 text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  <TelegramIcon className="mr-2 w-5 h-5" />
                  Telegram
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50 text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <Link to="/programs">
                  <Play className="mr-2 w-5 h-5" />
                  Explore Programs
                </Link>
              </Button>
            </div>
          </div>

          <div ref={statsRef} className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`absolute bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 shadow-elegant transition-all duration-700 hover:bg-white/20 hover:scale-105 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{
                    right: index === 0 ? '0' : index === 1 ? '40px' : '20px',
                    top: index === 0 ? '0' : index === 1 ? '120px' : '250px',
                    transitionDelay: `${500 + index * 150}ms`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold">
                      <stat.icon className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white hero-text-shadow">
                        <CountUpNumber end={stat.value} shouldStart={statsInView} />{stat.suffix}
                      </div>
                      <div className="text-white/90 text-sm font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden grid grid-cols-3 gap-4 mt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <stat.icon className="w-5 h-5 text-gold mb-2" />
              <div className="text-xl font-bold text-white hero-text-shadow">
                <CountUpNumber end={stat.value} shouldStart={statsInView} />{stat.suffix}
              </div>
              <div className="text-white/90 text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToPrograms}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest">Explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
