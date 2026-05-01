import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/seo/SEOHead';
import { Building2, Scale, Calculator, ArrowRight, Handshake, Users, DollarSign, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { CONSULTATION_FEE, WHATSAPP_LINK } from '@/lib/constants';

const partnerTypes = [
  {
    icon: Building2,
    title: 'Wealth Managers & Family Offices',
    description: 'Your clients ask about second citizenship. We handle the advisory — you maintain the relationship.',
  },
  {
    icon: Scale,
    title: 'Immigration Attorneys',
    description: 'Extend your practice to investment migration without building the expertise in-house.',
  },
  {
    icon: Calculator,
    title: 'Tax Advisors & CFOs',
    description: 'Your clients need citizenship for tax optimization. We provide the program access — you provide the strategy.',
  },
];

const steps = [
  {
    number: '01',
    icon: Users,
    title: 'Refer a Client',
    description: 'You introduce your client to Passport Capital via a simple referral form or direct introduction.',
  },
  {
    number: '02',
    icon: Handshake,
    title: 'We Qualify & Advise',
    description: 'Our team conducts a free consultation, identifies the right program, and presents options.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'You Stay In The Loop',
    description: 'Regular updates throughout the application process — your client never feels handed off.',
  },
  {
    number: '04',
    icon: DollarSign,
    title: 'You Earn Revenue',
    description: 'Receive 20–30% of our advisory fee for every successful referral.',
  },
];

const revenueStats = [
  {
    label: 'Typical Referral Fee',
    value: '$450–$7,500+',
    detail: 'per client',
  },
  {
    label: 'Malta MEIN Referral',
    value: 'Up to $7,500+',
    detail: 'single referral',
  },
  {
    label: 'No Strings Attached',
    value: 'Zero Requirements',
    detail: 'no minimums, no exclusivity',
  },
];

const Partners = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    partnerType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Inquiry submitted', {
        description: 'Our partnerships team will reach out within 24 hours.',
      });
      setFormData({ fullName: '', email: '', organization: '', partnerType: '', message: '' });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Layout>
      <SEOHead
        title="Partner With Us — B2B Referral Program | Passport Capital"
        description="Join our network of wealth managers, family offices, immigration attorneys, and tax advisors. Earn meaningful referral revenue while your clients get white-glove citizenship advisory."
        path="/partners"
      />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-wide text-center">
          <span className="section-label">Referral Partnership</span>
          <h1 className="section-title max-w-4xl mx-auto">
            Partner With Passport Capital
          </h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Join our network of wealth managers, family offices, immigration attorneys, and tax advisors. Earn meaningful referral revenue while your clients get white-glove citizenship advisory.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-label">Who We Partner With</span>
            <h2 className="section-title">Built for Trusted Advisors</h2>
            <p className="section-subtitle">
              We work alongside professionals who already serve high-net-worth clients and want to add citizenship advisory without the overhead.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((partner) => (
              <Card key={partner.title} className="border-border hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-xl gradient-royal flex items-center justify-center mb-4">
                    <partner.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {partner.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Four Simple Steps</h2>
            <p className="section-subtitle">
              From referral to revenue — a seamless process designed for busy professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-royal flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full gradient-gold text-accent-foreground flex items-center justify-center text-sm font-bold">
                  {step.number}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="section-header">
            <span className="section-label">Revenue Share</span>
            <h2 className="section-title">Earn Meaningfully on Every Referral</h2>
            <p className="section-subtitle">
              Transparent, generous revenue sharing with no hidden catches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {revenueStats.map((stat) => (
              <Card key={stat.label} className="border-accent/20 hover:shadow-gold transition-all hover:-translate-y-1">
                <CardContent className="pt-8 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <p className="text-gradient-gold font-display text-2xl md:text-3xl font-bold mb-2">
                    {stat.value}
                  </p>
                  <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container-narrow">
          <div className="section-header">
            <span className="section-label">Get Started</span>
            <h2 className="section-title">Partner Inquiry</h2>
            <p className="section-subtitle">
              Tell us about your practice and we'll set up a partnership call within 48 hours.
            </p>
          </div>

          <Card className="border-border shadow-card">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Jane Smith"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      placeholder="Smith & Associates"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Partner Type</Label>
                    <Select
                      value={formData.partnerType}
                      onValueChange={(value) => setFormData({ ...formData, partnerType: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wealth-manager">Wealth Manager</SelectItem>
                        <SelectItem value="immigration-attorney">Immigration Attorney</SelectItem>
                        <SelectItem value="tax-advisor">Tax Advisor</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your practice and client base..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="gradient-royal text-primary-foreground shadow-royal"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      Or Chat on WhatsApp
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Partners;
