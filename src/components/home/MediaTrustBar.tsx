import { Shield, Award, Users, Globe } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';
import navyLeatherTexture from '@/assets/navy-leather-texture.png';

const ForbesLogo = () => (
  <svg viewBox="0 0 200 50" className="h-6 md:h-8 w-auto" fill="currentColor">
    <text x="0" y="38" fontFamily="Georgia, serif" fontSize="42" fontWeight="400" letterSpacing="-1">
      Forbes
    </text>
  </svg>
);

const BloombergLogo = () => (
  <svg viewBox="0 0 240 50" className="h-5 md:h-7 w-auto" fill="currentColor">
    <text x="0" y="36" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" letterSpacing="1">
      Bloomberg
    </text>
  </svg>
);

const FinancialTimesLogo = () => (
  <svg viewBox="0 0 60 50" className="h-7 md:h-9 w-auto" fill="currentColor">
    <rect x="2" y="5" width="56" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="10" y="36" fontFamily="Georgia, serif" fontSize="28" fontWeight="400" fontStyle="italic">
      FT
    </text>
  </svg>
);

const ReutersLogo = () => (
  <svg viewBox="0 0 180 50" className="h-5 md:h-7 w-auto" fill="currentColor">
    <text x="0" y="35" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="700" letterSpacing="2">
      REUTERS
    </text>
    <circle cx="170" cy="25" r="6" fill="currentColor" />
  </svg>
);

const CNBCLogo = () => (
  <svg viewBox="0 0 120 50" className="h-5 md:h-7 w-auto" fill="currentColor">
    <text x="0" y="36" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="800" letterSpacing="1">
      CNBC
    </text>
  </svg>
);

const WSJLogo = () => (
  <svg viewBox="0 0 200 50" className="h-5 md:h-7 w-auto" fill="currentColor">
    <text x="0" y="36" fontFamily="Georgia, serif" fontSize="28" fontWeight="400" letterSpacing="0">
      The Wall Street Journal
    </text>
  </svg>
);

const EconomistLogo = () => (
  <svg viewBox="0 0 220 50" className="h-5 md:h-7 w-auto" fill="currentColor">
    <text x="0" y="36" fontFamily="Georgia, serif" fontSize="30" fontWeight="400" fontStyle="italic" letterSpacing="0">
      The Economist
    </text>
  </svg>
);

const mediaLogos = [
  { name: 'Forbes', Component: ForbesLogo },
  { name: 'Bloomberg', Component: BloombergLogo },
  { name: 'Financial Times', Component: FinancialTimesLogo },
  { name: 'Reuters', Component: ReutersLogo },
  { name: 'CNBC', Component: CNBCLogo },
  { name: 'The Wall Street Journal', Component: WSJLogo },
  { name: 'The Economist', Component: EconomistLogo },
];

const trustStats = [
  { icon: Shield, value: '99%', label: 'Success Rate' },
  { icon: Users, value: '250+', label: 'Families Served' },
  { icon: Globe, value: '15+', label: 'Countries' },
  { icon: Award, value: '12', label: 'Years Experience' },
];

const MediaTrustBar = () => {
  return (
    <section
      className="py-16 border-y border-gold/20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${navyLeatherTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sapphire-deep/30 via-transparent to-sapphire-deep/30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {trustStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/30 mb-4 group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-gold" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/80 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-[0.25em] mb-8 font-medium">
            As Featured In
          </p>
          <Marquee pauseOnHover speed={40} className="py-4">
            {mediaLogos.map((media, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-8 py-3 text-white/40 hover:text-cream transition-all duration-300 cursor-pointer"
                title={media.name}
              >
                <media.Component />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default MediaTrustBar;
