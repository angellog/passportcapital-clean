import { useState } from 'react';
import { Clock, ArrowRight, Calendar, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type Category = 'All' | 'Citizenship Programs' | 'Golden Visas' | 'Tax & Strategy' | 'Crypto & CBI' | 'Family Planning';

interface Article {
  category: Category;
  title: string;
  excerpt: string;
  readTime: number;
  date: string;
}

const categories: Category[] = [
  'All',
  'Citizenship Programs',
  'Golden Visas',
  'Tax & Strategy',
  'Crypto & CBI',
  'Family Planning',
];

const categoryBadgeColors: Record<string, string> = {
  'Citizenship Programs': 'bg-gold/15 text-gold-dark border-gold/30',
  'Golden Visas': 'bg-blue-500/15 text-blue-700 border-blue-500/30',
  'Tax & Strategy': 'bg-green-600/15 text-green-700 border-green-600/30',
  'Crypto & CBI': 'bg-orange-500/15 text-orange-700 border-orange-500/30',
  'Family Planning': 'bg-purple-500/15 text-purple-700 border-purple-500/30',
};

const articles: Article[] = [
  {
    category: 'Citizenship Programs',
    title: 'Dominica vs. St. Lucia: Which Caribbean CBI Program Is Right for You?',
    excerpt: 'A side-by-side comparison of two of the most accessible citizenship-by-investment programs — including new price drops and family options.',
    readTime: 6,
    date: '2025-04-15',
  },
  {
    category: 'Golden Visas',
    title: "Portugal's Golden Visa After the 2023 Changes: What You Need to Know",
    excerpt: "The real estate route is gone — but Portugal remains one of Europe's best residency options. Here's what works now.",
    readTime: 8,
    date: '2025-04-10',
  },
  {
    category: 'Tax & Strategy',
    title: 'How Second Citizenship Reduces Your Global Tax Exposure',
    excerpt: 'From Caribbean passports to UAE residency — legal frameworks for tax optimization through investment migration.',
    readTime: 7,
    date: '2025-04-05',
  },
  {
    category: 'Crypto & CBI',
    title: 'Paying for Citizenship with Bitcoin: The 2025 Guide',
    excerpt: 'Which countries accept crypto for CBI programs, how the process works, and what your auditor needs to know.',
    readTime: 5,
    date: '2025-03-28',
  },
  {
    category: 'Family Planning',
    title: 'Including Parents and Siblings in Your Citizenship Application',
    excerpt: "Not all programs allow extended family. Here's a breakdown of which ones do — and what it costs.",
    readTime: 6,
    date: '2025-03-20',
  },
  {
    category: 'Citizenship Programs',
    title: "Malta's MEIN Program: Is Europe's Premium Citizenship Worth It?",
    excerpt: "At €690K+, Malta offers the only direct EU citizenship by investment. We break down who should consider it.",
    readTime: 9,
    date: '2025-03-15',
  },
];

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Insights = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [email, setEmail] = useState('');

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed to insights');
    setEmail('');
  };

  return (
    <Layout>
      <SEOHead
        title="Insights | Passport Capital"
        description="Expert analysis on citizenship-by-investment, golden visas, and global mobility. Written by advisors — not marketers."
        path="/insights"
      />

      <section className="py-16 gradient-royal relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="section-label text-primary-foreground/70">Insights</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Insights
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Expert analysis on citizenship-by-investment, golden visas, and global mobility. Written by advisors — not marketers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 bg-secondary border-b border-border">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'gradient-royal text-primary-foreground' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <Card
                key={index}
                className="card-premium hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <Badge
                    variant="outline"
                    className={`self-start mb-4 ${categoryBadgeColors[article.category] || ''}`}
                  >
                    {article.category}
                  </Badge>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(article.date)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User className="w-3.5 h-3.5" />
                        Passport Capital Advisory
                      </span>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container-narrow text-center">
          <span className="section-label">Newsletter</span>
          <h2 className="section-title">Get Insights Delivered</h2>
          <p className="section-subtitle mb-8">
            Monthly analysis on programs, policy changes, and strategy. No spam. Unsubscribe anytime.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
            <Button type="submit" className="gradient-royal text-primary-foreground shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Insights;
