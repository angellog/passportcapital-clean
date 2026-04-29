import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Alexander Chen',
    title: 'Tech Entrepreneur',
    location: 'Singapore → Portugal',
    program: 'Portugal Golden Visa',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: "Passport Capital made the entire process seamless. Within 8 months, my family secured our Portuguese residency. The team's expertise in navigating the legal complexities was invaluable.",
    rating: 5,
    timeline: '8 months',
  },
  {
    id: 2,
    name: 'Sarah & Michael Roberts',
    title: 'Private Investors',
    location: 'United States → Malta',
    program: 'Malta Citizenship',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face',
    quote: "After evaluating several firms, we chose Passport Capital for their transparency and track record. Our Maltese citizenship opened doors across the EU for our business expansion.",
    rating: 5,
    timeline: '14 months',
  },
  {
    id: 3,
    name: 'Dimitri Volkov',
    title: 'Hedge Fund Manager',
    location: 'Russia → St. Kitts & Nevis',
    program: 'St. Kitts CBI',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: "Speed was critical for my situation. The team delivered on their promise – my Caribbean passport was approved in under 4 months. Professional service from start to finish.",
    rating: 5,
    timeline: '4 months',
  },
  {
    id: 4,
    name: 'Aisha Al-Rashid',
    title: 'Real Estate Developer',
    location: 'UAE → Grenada',
    program: 'Grenada CBI',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    quote: "The Grenada program with E-2 treaty access to the US was exactly what I needed. Passport Capital guided us through every step with patience and expertise.",
    rating: 5,
    timeline: '5 months',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sapphire-deep/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-4">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-sapphire-deep mb-4">
            Trusted by <span className="text-gold">Global Families</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real journeys from clients who secured their Plan B with our guidance
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-elegant border border-gold/10 p-8 md:p-12 relative">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-gold">
              <Quote className="w-5 h-5 text-sapphire-deep" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 text-center md:text-left">
                <img
                  src={activeTestimonial.image}
                  alt={`${activeTestimonial.name} - ${activeTestimonial.program} client`}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gold/30 mx-auto md:mx-0 mb-4"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
                <h4 className="font-display font-semibold text-sapphire-deep">
                  {activeTestimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {activeTestimonial.title}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-0.5 mt-2">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <blockquote className="text-lg md:text-xl text-sapphire-deep/90 leading-relaxed mb-6 italic">
                  "{activeTestimonial.quote}"
                </blockquote>

                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-sapphire-deep/5 rounded-lg">
                    <span className="text-xs text-muted-foreground block">Program</span>
                    <span className="text-sm font-semibold text-sapphire-deep">{activeTestimonial.program}</span>
                  </div>
                  <div className="px-4 py-2 bg-sapphire-deep/5 rounded-lg">
                    <span className="text-xs text-muted-foreground block">Journey</span>
                    <span className="text-sm font-semibold text-sapphire-deep">{activeTestimonial.location}</span>
                  </div>
                  <div className="px-4 py-2 bg-gold/10 rounded-lg">
                    <span className="text-xs text-muted-foreground block">Timeline</span>
                    <span className="text-sm font-semibold text-gold">{activeTestimonial.timeline}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-gold w-8'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="border-gold/30 hover:bg-gold/10 hover:border-gold"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="border-gold/30 hover:bg-gold/10 hover:border-gold"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
