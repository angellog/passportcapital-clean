import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { programs } from '@/data/programs';
import { countries, investmentBudgets } from '@/data/countries';

const contactSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100, 'Full name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  whatsapp: z.string().trim().min(5, 'WhatsApp number is required').max(20, 'WhatsApp number must be less than 20 characters'),
  budgetRange: z.string().min(1, 'Please select your investment budget'),
  programInterest: z.string().min(1, 'Please select a program'),
  nationality: z.string().min(1, 'Please select your nationality'),
  countryOfResidence: z.string().min(1, 'Please select your country of residence'),
  timeline: z.string().min(1, 'Please select your timeline'),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      whatsapp: '',
      budgetRange: '',
      programInterest: '',
      nationality: '',
      countryOfResidence: '',
      timeline: '',
      notes: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    const { error } = await supabase.from('enquiries').insert({
      full_name: data.fullName,
      email: data.email,
      whatsapp: data.whatsapp,
      budget_range: data.budgetRange,
      program_interest: data.programInterest,
      nationality: data.nationality,
      country_of_residence: data.countryOfResidence,
      timeline: data.timeline,
      notes: data.notes || null,
      status: 'new',
      source: 'website',
    });

    if (error) {
      toast.error('Submission Failed', { description: 'Please try again or contact us directly.' });
    } else {
      toast.success('Enquiry Submitted Successfully', { description: 'Our team will contact you within 24 hours.' });
      form.reset();
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-royal-900" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <div className="container-wide relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold tracking-[0.3em] text-gold-400 uppercase mb-4">
            Get Started Today
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Contact an Advisor
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Complete the form below and one of our citizenship specialists will be in touch within 24 hours.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Smith"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Investment Budget *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-gold-400 focus:ring-gold-400/20 [&>span]:text-white/40 [&[data-state=open]>span]:text-white data-[placeholder]:text-white/40">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-navy border-white/20">
                        {investmentBudgets.map((budget) => (
                          <SelectItem
                            key={budget}
                            value={budget}
                            className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                          >
                            {budget}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="programInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Program of Interest *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-gold-400 focus:ring-gold-400/20 [&>span]:text-white/40 [&[data-state=open]>span]:text-white data-[placeholder]:text-white/40">
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-navy border-white/20 max-h-[300px]">
                        <SelectItem
                          value="general"
                          className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                        >
                          General Enquiry
                        </SelectItem>
                        {programs.map((program) => (
                          <SelectItem
                            key={program.id}
                            value={program.id}
                            className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                          >
                            {program.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Timeline *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-gold-400 focus:ring-gold-400/20 [&>span]:text-white/40 [&[data-state=open]>span]:text-white data-[placeholder]:text-white/40">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-navy border-white/20">
                        <SelectItem value="asap" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">As soon as possible</SelectItem>
                        <SelectItem value="1-3months" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">1-3 months</SelectItem>
                        <SelectItem value="3-6months" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">3-6 months</SelectItem>
                        <SelectItem value="6-12months" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">6-12 months</SelectItem>
                        <SelectItem value="exploring" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Just exploring</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">WhatsApp Number *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 234 567 8900"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Nationality *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-gold-400 focus:ring-gold-400/20 [&>span]:text-white/40 [&[data-state=open]>span]:text-white data-[placeholder]:text-white/40">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-navy border-white/20 max-h-[300px]">
                        {countries.map((country) => (
                          <SelectItem
                            key={country}
                            value={country}
                            className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countryOfResidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Country of Residence *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-gold-400 focus:ring-gold-400/20 [&>span]:text-white/40 [&[data-state=open]>span]:text-white data-[placeholder]:text-white/40">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-navy border-white/20 max-h-[300px]">
                        {countries.map((country) => (
                          <SelectItem
                            key={country}
                            value={country}
                            className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-8">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Your Enquiry (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your goals and any specific questions you have..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20 min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-center gap-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold-500 hover:bg-gold-600 text-navy font-semibold px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                <Send className="ml-2 h-5 w-5" />
              </Button>

              <p className="font-display italic text-gold-400/80 text-xl">
                Your Future, First.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ContactForm;
