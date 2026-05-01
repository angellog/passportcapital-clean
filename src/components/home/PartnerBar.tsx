import { Shield, Scale, Wallet } from 'lucide-react';

const govPrograms = [
  'Dominica CBI Unit',
  'St. Lucia CBI Unit',
  'Antigua & Barbuda CBI',
  'Grenada CBI Unit',
  'Malta MEIN',
  'Portugal AIMA',
  'Greece Golden Visa',
  'Turkey CBI',
];

const legalPartners = [
  { name: 'Hague Accredited Agents', icon: Scale },
  { name: 'Due Diligence Partners', icon: Shield },
  { name: 'Licensed Immigration Attorneys', icon: Scale },
  { name: 'Notary & Apostille Network', icon: Shield },
];

const paymentMethods = [
  { name: 'Bank Transfer', symbol: '🏦' },
  { name: 'Bitcoin', symbol: 'BTC' },
  { name: 'Ethereum', symbol: 'ETH' },
  { name: 'USDT', symbol: 'USDT' },
  { name: 'Solana', symbol: 'SOL' },
];

const PartnerBar = () => {
  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sapphire-deep/20 via-transparent to-sapphire-deep/20" />
      <div className="absolute left-1/3 top-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute right-1/3 bottom-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        <div className="section-header">
          <div className="section-label text-gold">
            <span>Our Ecosystem</span>
          </div>
          <h2 className="section-title text-white">
            Backed by Government Programs. Powered by Global Partners.
          </h2>
          <div className="divider-royal mx-auto mt-6" />
        </div>

        <div className="space-y-10">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            <span className="shrink-0 text-gold text-xs font-semibold uppercase tracking-[0.2em] md:pt-2.5 md:w-44">
              Authorized Programs
            </span>
            <div className="flex flex-wrap gap-2">
              {govPrograms.map((program) => (
                <span
                  key={program}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  {program}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            <span className="shrink-0 text-gold text-xs font-semibold uppercase tracking-[0.2em] md:pt-2.5 md:w-44">
              Legal & Compliance Network
            </span>
            <div className="flex flex-wrap gap-3">
              {legalPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <partner.icon className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-sm text-white/90">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            <span className="shrink-0 text-gold text-xs font-semibold uppercase tracking-[0.2em] md:pt-2.5 md:w-44">
              Accepted Payment Methods
            </span>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method.name}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <Wallet className="w-3.5 h-3.5 text-gold" />
                  {method.symbol !== '🏦' ? (
                    <>
                      <span className="text-white/50 text-xs font-mono">{method.symbol}</span>
                      <span>{method.name}</span>
                    </>
                  ) : (
                    <span>{method.name}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-white/40 text-sm max-w-2xl mx-auto leading-relaxed">
          All programs are processed through authorized government channels. Crypto payments are settled through licensed exchanges.
        </p>
      </div>
    </section>
  );
};

export default PartnerBar;
