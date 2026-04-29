import Layout from '@/components/layout/Layout';
import { FileText } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { LegalContactCard } from '@/components/shared/LegalContactCard';

const TermsOfService = () => {
  return (
    <Layout>
      <SEOHead
        title="Terms of Service | Passport Capital"
        description="Read the terms and conditions governing your use of Passport Capital services."
        path="/terms"
      />
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Legal
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
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
                Welcome to Passport Capital. By accessing our website and using our Citizenship and Residency by Investment consultancy services, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">1. Services Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                Passport Capital provides advisory and facilitation services for Citizenship by Investment (CBI) and Residency by Investment (RBI) programs. Our services include:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>Program consultation and eligibility assessment</li>
                <li>Application preparation and document review</li>
                <li>Liaison with government agencies and authorized agents</li>
                <li>Due diligence coordination</li>
                <li>Post-approval support and guidance</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We act as consultants and facilitators. Final approval of any application rests solely with the relevant government authority.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">2. Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                To use our services, you must be at least 18 years of age and legally capable of entering into binding agreements. You represent that all information provided to us is truthful, accurate, and complete. Providing false or misleading information may result in application denial and termination of our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">3. Fees & Payment</h2>
              <p className="text-muted-foreground leading-relaxed">Our fees consist of:</p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li><strong className="text-foreground">Consultation Fees:</strong> For initial assessment and program recommendations.</li>
                <li><strong className="text-foreground">Service Fees:</strong> For application processing, document preparation, and ongoing case management.</li>
                <li><strong className="text-foreground">Government Fees:</strong> Passed through at cost as required by the specific program (non-refundable once submitted).</li>
                <li><strong className="text-foreground">Third-Party Fees:</strong> Legal, due diligence, and translation costs as applicable.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We accept payment via bank transfer, credit card, and select cryptocurrencies (BTC, ETH, USDT, BNB, SOL). All fees and payment schedules will be outlined in your client agreement before engagement.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">4. Client Obligations</h2>
              <p className="text-muted-foreground leading-relaxed">As a client, you agree to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>Provide accurate, complete, and timely documentation</li>
                <li>Respond promptly to requests for information or clarification</li>
                <li>Disclose any material facts that may affect your application</li>
                <li>Comply with the laws and regulations of the target jurisdiction</li>
                <li>Pay all agreed fees according to the schedule in your client agreement</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">5. No Guarantee of Approval</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we maintain a high success rate, we cannot and do not guarantee approval of any application. Citizenship and residency decisions are made solely by sovereign governments. Our role is to maximize your chances through expert preparation and guidance, but the final decision lies outside our control.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">6. Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service fees are outlined in your client agreement. Government fees submitted to authorities are non-refundable. Refunds of Passport Capital service fees, if applicable, will be handled according to the terms of your individual client agreement.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website — including text, graphics, logos, and design elements — is the property of Passport Capital and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, Passport Capital shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of our services. Our total liability is limited to the fees paid to us for the specific service in question. We are not responsible for delays or denials caused by government processing, changes in program requirements, or circumstances beyond our control.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">9. Confidentiality</h2>
              <p className="text-muted-foreground leading-relaxed">
                We treat all client information as strictly confidential. Information is shared only with parties directly involved in your application process, as outlined in our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Passport Capital is registered. Any disputes arising from these Terms shall be resolved through good-faith negotiation, and if necessary, binding arbitration.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">11. Changes to These Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the revised Terms. Material changes will be communicated to active clients directly.
              </p>
            </div>

            <LegalContactCard />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
