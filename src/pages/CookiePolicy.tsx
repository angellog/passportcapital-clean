import Layout from '@/components/layout/Layout';
import { Cookie } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { LegalContactCard } from '@/components/shared/LegalContactCard';

const CookiePolicy = () => {
  return (
    <Layout>
      <SEOHead
        title="Cookie Policy | Passport Capital"
        description="Understand how Passport Capital uses cookies and similar technologies on our website."
        path="/cookies"
      />
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Cookie className="w-4 h-4" />
              Legal
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">Last updated: February 12, 2026</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This Cookie Policy explains what cookies are, how Passport Capital uses them on our website, and your choices regarding their use. By continuing to use our website, you consent to the use of cookies as described in this policy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, provide information to site owners, and enhance the user experience. Cookies may be "session" cookies (deleted when you close your browser) or "persistent" cookies (remaining on your device for a set period).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">2. Types of Cookies We Use</h2>

              <div className="bg-muted/30 border border-border rounded-xl p-6 space-y-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable core features like page navigation, security, and access to secure areas. The website cannot function without these cookies, and they cannot be disabled.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">Analytics Cookies</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This data helps us improve site performance and user experience. We may use services like Google Analytics for this purpose.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">Functional Cookies</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These cookies remember choices you make (such as language or region preferences) to provide a more personalized experience. They may also be used to remember changes you've made to customizable parts of the website.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    These cookies may be set through our site by advertising partners to build a profile of your interests and show you relevant content on other sites. They do not store personal information directly but are based on uniquely identifying your browser and device.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">3. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some cookies on our website are placed by third-party services that appear on our pages. We do not control these cookies. Third parties that may set cookies include:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>Google Analytics (website usage analysis)</li>
                <li>WhatsApp (chat widget functionality)</li>
                <li>Payment processors (secure transaction handling)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">4. Managing Your Cookie Preferences</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can control and manage cookies in several ways:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li><strong className="text-foreground">Browser Settings:</strong> Most browsers allow you to view, manage, and delete cookies through their settings. Consult your browser's help documentation for instructions.</li>
                <li><strong className="text-foreground">Opt-Out Links:</strong> For Google Analytics, you can install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-Out Browser Add-on</a>.</li>
                <li><strong className="text-foreground">Device Settings:</strong> On mobile devices, you can manage cookie preferences through your device's privacy or browser settings.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Please note that disabling certain cookies may affect the functionality of our website and limit your ability to use some features.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">5. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any updates will be posted on this page with a revised "Last updated" date.
              </p>
            </div>

            <LegalContactCard />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CookiePolicy;
