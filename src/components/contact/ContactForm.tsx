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
import { countries, countryCodes, investmentBudgets } from '@/data/countries';

const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().trim().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  countryCode: z.string().min(1, 'Country code is required'),
  phone: z.string().trim().min(5, 'Phone number is required').max(20, 'Phone number must be less than 20 characters'),
  investmentBudget: z.string().min(1, 'Please select your investment budget'),
  programInterest: z.string().min(1, 'Please select a program'),
  nationality: z.string().min(1, 'Please select your nationality'),
  residence: z.string().min(1, 'Please select your country of residence'),
  enquiry: z.string().max(1000, 'Enquiry must be less than 1000 characters').optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+1',
      phone: '',
      investmentBudget: '',
      programInterest: '',
      nationality: '',
      residence: '',
      enquiry: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    const { error } = await supabase.from('contact_enquiries').insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      country_code: data.countryCode,
      phone: data.phone,
      investment_budget: data.investmentBudget,
      program_interest: data.programInterest,
      nationality: data.nationality,
      residence: data.residence,
      enquiry: data.enquiry || null,
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">First Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Last Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Smith"
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
                name="investmentBudget"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm">Phone Number *</FormLabel>
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field: codeField }) => (
                          <Select onValueChange={codeField.onChange} defaultValue={codeField.value}>
                            <FormControl>
                              <SelectTrigger className="w-24 bg-white/10 border-white/20 text-white focus:border-gold-400 focus:ring-gold-400/20">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-navy border-white/20 max-h-[300px]">
                              {countryCodes.map((cc) => (
                                <SelectItem
                                  key={cc.code}
                                  value={cc.code}
                                  className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                                >
                                  {cc.code} {cc.country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FormControl>
                        <Input
                          placeholder="123 456 7890"
                          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold-400 focus:ring-gold-400/20"
                          {...field}
                        />
                      </FormControl>
                    </div>
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
                name="residence"
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
                name="enquiry"
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
