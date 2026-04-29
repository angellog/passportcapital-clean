import { useIsMobile } from '@/hooks/use-mobile';

const countries = [
  { flag: '\u{1F1E9}\u{1F1F2}', name: 'Dominica', investment: '$100K', angle: 0 },
  { flag: '\u{1F1F0}\u{1F1F3}', name: 'St. Kitts', investment: '$250K', angle: 36 },
  { flag: '\u{1F1EC}\u{1F1E9}', name: 'Grenada', investment: '$150K', angle: 72 },
  { flag: '\u{1F1E6}\u{1F1EC}', name: 'Antigua', investment: '$100K', angle: 108 },
  { flag: '\u{1F1F1}\u{1F1E8}', name: 'St. Lucia', investment: '$100K', angle: 144 },
  { flag: '\u{1F1F2}\u{1F1F9}', name: 'Malta', investment: '$690K', angle: 180 },
  { flag: '\u{1F1F5}\u{1F1F9}', name: 'Portugal', investment: '$250K', angle: 216 },
  { flag: '\u{1F1EC}\u{1F1F7}', name: 'Greece', investment: '$250K', angle: 252 },
  { flag: '\u{1F1F9}\u{1F1F7}', name: 'Turkey', investment: '$400K', angle: 288 },
  { flag: '\u{1F1FB}\u{1F1FA}', name: 'Vanuatu', investment: '$130K', angle: 324 },
];

const GlobalReachGraphic = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="w-full rounded-3xl overflow-hidden bg-gradient-to-br from-navy via-royal to-sapphire-deep p-6">
        <h3 className="text-center font-display text-xl font-bold text-primary-foreground mb-1">
          Your Second Passport Awaits
        </h3>
        <p className="text-center text-primary-foreground/60 text-xs mb-5">
          Investment by Citizenship Programs
        </p>

        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-royal-light/40 via-sapphire/30 to-royal/20 border border-primary-foreground/10 shadow-[0_0_30px_hsl(var(--royal-blue)/0.4)] flex items-center justify-center">
          <span className="text-3xl">{'\u{1F30D}'}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {countries.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 bg-primary-foreground/5 backdrop-blur-sm rounded-xl px-3 py-2 border border-primary-foreground/10"
            >
              <span className="text-xl">{c.flag}</span>
              <div className="min-w-0">
                <p className="text-primary-foreground text-xs font-semibold truncate">{c.name}</p>
                <p className="text-gold text-xs font-bold">{c.investment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const radius = 175;

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-navy via-royal to-sapphire-deep">
      <div className="absolute top-5 left-0 right-0 text-center z-10">
        <h3 className="font-display text-lg font-bold text-primary-foreground">
          Your Second Passport Awaits
        </h3>
        <p className="text-primary-foreground/60 text-xs">
          Investment by Citizenship Programs
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-royal-light/40 via-sapphire/30 to-royal/20 border border-primary-foreground/10 shadow-[0_0_50px_hsl(var(--royal-blue)/0.5)] flex items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-primary-foreground/10" />
          <div className="absolute inset-4 rounded-full border border-primary-foreground/5" />
          <div className="absolute w-full h-[1px] bg-primary-foreground/10 top-1/2" />
          <div className="absolute h-full w-[1px] bg-primary-foreground/10 left-1/2" />
          <span className="text-4xl relative z-10">{'\u{1F30D}'}</span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {countries.map((c) => {
          const rad = (c.angle - 90) * (Math.PI / 180);
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={c.name}
              className="absolute flex flex-col items-center gap-0.5 group"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <span className="text-2xl drop-shadow-lg group-hover:scale-125 transition-transform">
                {c.flag}
              </span>
              <span className="text-primary-foreground text-[10px] font-semibold whitespace-nowrap">
                {c.name}
              </span>
              <span className="text-gold text-[10px] font-bold">{c.investment}</span>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full border border-dashed border-primary-foreground/10" />
      </div>
    </div>
  );
};

export default GlobalReachGraphic;
