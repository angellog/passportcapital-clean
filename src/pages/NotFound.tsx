import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Globe, ArrowRight, Home, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { WHATSAPP_LINK } from '@/lib/constants';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error('404 Error: User attempted to access non-existent route:', location.pathname);
    }
  }, [location.pathname]);

  return (
    <Layout>
      <SEOHead
        title="Page Not Found | Passport Capital"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <div className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="w-20 h-20 rounded-2xl gradient-royal flex items-center justify-center mx-auto mb-8 shadow-royal">
            <Globe className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This page doesn't exist. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Button asChild className="gradient-royal text-primary-foreground rounded-xl shadow-royal">
              <Link to="/"><Home className="w-4 h-4 mr-2" /> Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/programs"><BookOpen className="w-4 h-4 mr-2" /> Browse Programs</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Need help?{' '}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
              Contact us <ArrowRight className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
