import Layout from '@/components/layout/Layout';
import { Shield } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { LegalContactCard } from '@/components/shared/LegalContactCard';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy | Passport Capital"
        description="Learn how Passport Capital collects, uses, and protects your personal information."
        path="/privacy"
      />
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Legal
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
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
                At Passport Capital, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services related to Citizenship and Residency by Investment programs.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">We may collect the following types of information:</p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, nationality, passport details, and financial information necessary for your application.</li>
                <li><strong className="text-foreground">Identity Documents:</strong> Copies of passports, birth certificates, marriage certificates, and other government-issued documents.</li>
                <li><strong className="text-foreground">Financial Records:</strong> Bank statements, proof of funds, source of wealth documentation, and investment records.</li>
                <li><strong className="text-foreground">Usage Data:</strong> Browser type, IP address, pages visited, and interaction patterns on our website.</li>
                <li><strong className="text-foreground">Communication Data:</strong> Records of correspondence via email, WhatsApp, or contact forms.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">Your information is used to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>Process and manage your citizenship or residency application</li>
                <li>Communicate with you regarding your case and provide updates</li>
                <li>Conduct due diligence as required by government programs</li>
                <li>Comply with legal and regulatory obligations</li>
                <li>Improve our website and services</li>
                <li>Send relevant program updates and opportunities (with your consent)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li><strong className="text-foreground">Government Agencies:</strong> As required for your citizenship or residency application processing.</li>
                <li><strong className="text-foreground">Licensed Agents & Legal Partners:</strong> Trusted partners who assist in processing your application in specific jurisdictions.</li>
                <li><strong className="text-foreground">Due Diligence Providers:</strong> Third-party firms conducting background checks as mandated by program requirements.</li>
                <li><strong className="text-foreground">Service Providers:</strong> Technology and payment processing partners who help operate our services, bound by confidentiality agreements.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures including encryption, secure servers, and access controls to protect your personal data. All sensitive documents are transmitted via encrypted channels and stored in secure, access-controlled systems.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses cookies to enhance your browsing experience. For full details on the cookies we use and how to manage them, please see our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a>.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and support your ongoing citizenship or residency status. Application records are typically retained for a minimum of seven years as required by regulatory standards.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">8. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date. We encourage you to review this policy regularly.
              </p>
            </div>

            <LegalContactCard />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
