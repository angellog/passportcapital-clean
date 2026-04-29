import { Wallet } from 'lucide-react';

const cryptos = [
  { name: 'Bitcoin', symbol: 'BTC', color: '#F7931A', icon: '₿' },
  { name: 'Ethereum', symbol: 'ETH', color: '#627EEA', icon: 'Ξ' },
  { name: 'Tether', symbol: 'USDT', color: '#26A17B', icon: '₮' },
  { name: 'Solana', symbol: 'SOL', color: '#9945FF', icon: '◎' },
];

const CryptoBadges = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-sapphire-deep via-navy to-sapphire-deep relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container-wide relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 mb-4">
              <Wallet className="w-4 h-4 text-gold" />
              <span className="text-white/80 text-sm font-medium">Crypto-Friendly</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              We Accept Cryptocurrency
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Make your citizenship investment using your preferred digital currency.
              Fast, secure, and completely confidential transactions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {cryptos.map((crypto, index) => (
              <div
                key={crypto.symbol}
                className="group relative flex items-center gap-3 px-5 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: crypto.color }}
                >
                  {crypto.icon}
                </div>

                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{crypto.symbol}</p>
                  <p className="text-white/50 text-xs">{crypto.name}</p>
                </div>

                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: crypto.color }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-center">
            <span className="text-white/40 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Instant Processing
            </span>
            <span className="text-white/40 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Secure Transactions
            </span>
            <span className="text-white/40 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Full Privacy
            </span>
            <span className="text-white/40 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              No Hidden Fees
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoBadges;
