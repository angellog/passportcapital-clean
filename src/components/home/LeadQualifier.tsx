import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WhatsAppIcon, TelegramIcon } from '@/components/shared';
import { WHATSAPP_LINK, TELEGRAM_LINK } from '@/lib/constants';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 1,
    question: 'What are you looking for?',
    options: [
      { label: 'Citizenship by Investment', value: 'Citizenship by Investment' },
      { label: 'Residency by Investment', value: 'Residency by Investment' },
      { label: 'Not sure yet — guide me', value: 'Not sure yet — guide me' },
    ],
  },
  {
    id: 2,
    question: "What's your investment range?",
    options: [
      { label: '$100K–$250K', value: '$100K–$250K' },
      { label: '$250K–$500K', value: '$250K–$500K' },
      { label: '$500K+', value: '$500K+' },
      { label: 'Still exploring', value: 'Still exploring' },
    ],
  },
  {
    id: 3,
    question: 'When are you looking to move?',
    options: [
      { label: 'ASAP', value: 'ASAP' },
      { label: 'Within 6–12 months', value: 'Within 6–12 months' },
      { label: '12+ months', value: '12+ months' },
      { label: 'Just researching', value: 'Just researching' },
    ],
  },
];

const getResultMessage = (answers: Record<number, string>) => {
  const program = answers[1];
  if (program === 'Citizenship by Investment') {
    return 'We recommend starting with our Citizenship consultation.';
  }
  if (program === 'Residency by Investment') {
    return 'We recommend starting with our Residency consultation.';
  }
  return 'We recommend starting with our Discovery consultation to find the right path for you.';
};

const buildWhatsAppUrl = (answers: Record<number, string>) => {
  const message = `Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(answers[1])}%20with%20a%20budget%20of%20${encodeURIComponent(answers[2])}%20and%20timeline%20of%20${encodeURIComponent(answers[3])}`;
  return `${WHATSAPP_LINK}?text=${message}`;
};

const LeadQualifier = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [, setDirection] = useState<'forward' | 'back'>('forward');

  const isComplete = currentStep === 4;

  const selectOption = (stepId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
  };

  const goNext = () => {
    setDirection('forward');
    setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => {
    setDirection('back');
    setCurrentStep((prev) => prev - 1);
  };

  const reset = () => {
    setAnswers({});
    setCurrentStep(1);
  };

  return (
    <section className="py-24 bg-secondary/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gold/5 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-wide relative">
        <div className="section-header">
          <div className="section-label">
            <Check className="w-4 h-4" />
            <span>Find Your Program</span>
          </div>
          <h2 className="section-title">Tell Us What You Need</h2>
          <p className="section-subtitle">
            Three quick questions to match you with the right program and advisor.
          </p>
          <div className="divider-royal mx-auto mt-6" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (step.id < currentStep && !isComplete) {
                      setDirection('back');
                      setCurrentStep(step.id);
                    }
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step.id < currentStep
                      ? 'bg-gold text-sapphire-deep shadow-gold cursor-pointer'
                      : step.id === currentStep && !isComplete
                        ? 'bg-gradient-to-br from-primary to-sapphire-deep text-primary-foreground shadow-royal'
                        : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                </button>
                {step.id < steps.length && (
                  <div
                    className={`w-12 h-0.5 rounded-full transition-colors duration-300 ${
                      step.id < currentStep ? 'bg-gold' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {!isComplete && (
            <div className="min-h-[340px]">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`transition-all duration-300 ${
                    step.id === currentStep
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 absolute pointer-events-none'
                  }`}
                >
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground text-center mb-6">
                    {step.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {step.options.map((option) => {
                      const isSelected = answers[step.id] === option.value;
                      return (
                        <Card
                          key={option.value}
                          onClick={() => selectOption(step.id, option.value)}
                          className={`cursor-pointer p-5 rounded-xl transition-all duration-200 ${
                            isSelected
                              ? 'border-gold bg-gold/5 shadow-md'
                              : 'border-border bg-card hover:border-primary/30 hover:shadow-card-hover'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                isSelected ? 'border-gold bg-gold' : 'border-border'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-sapphire-deep" />}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                isSelected ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {option.label}
                            </span>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      onClick={step.id === 1 ? undefined : goBack}
                      className={step.id === 1 ? 'invisible' : ''}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={goNext}
                      disabled={!answers[step.id]}
                      className="gradient-royal text-primary-foreground rounded-xl shadow-royal hover:shadow-royal-lg transition-all"
                    >
                      {step.id === 3 ? 'See Results' : 'Next'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isComplete && (
            <div className="animate-in fade-in duration-500">
              <Card className="bg-white rounded-2xl border border-gold/20 p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
                <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-gold">
                  <Check className="w-5 h-5 text-sapphire-deep" />
                </div>

                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-sapphire-deep mb-3">
                    Your Personalized Recommendation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                    Based on your preferences, {getResultMessage(answers)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center mb-8">
                  {Object.entries(answers).map(([stepId, answer]) => (
                    <span
                      key={stepId}
                      className="px-4 py-2 bg-gold/10 text-gold-dark text-sm font-medium rounded-full"
                    >
                      {answer}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold"
                  >
                    <a
                      href={buildWhatsAppUrl(answers)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="mr-2 w-5 h-5" />
                      Chat on WhatsApp
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#0088cc] text-white hover:bg-[#0088cc]/90"
                  >
                    <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                      <TelegramIcon className="mr-2 w-5 h-5" />
                      Telegram
                    </a>
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    to="/programs"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    Skip to browse programs →
                  </Link>
                  <Button variant="ghost" size="sm" onClick={reset}>
                    Start over
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadQualifier;
