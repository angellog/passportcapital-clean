import { ArrowRight, Check, DollarSign, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TelegramIcon, WhatsAppIcon } from '@/components/shared';
import { iconMap } from '@/lib/iconMap';
import {
  WHATSAPP_LINK,
  TELEGRAM_LINK,
  CONSULTATION_FEE,
  COMMITMENT_FEE_RATE,
  formatCurrency,
} from '@/lib/constants';
import { Program, InvestmentRoute, CostBreakdown } from '@/data/programs';

interface InvestmentCardProps {
  program: Program;
}

const SharedFeesDisplay = ({ costBreakdown }: { costBreakdown: CostBreakdown }) => (
  <>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Due Diligence</span>
      <span className="font-medium text-foreground">{formatCurrency(costBreakdown.dueDiligence)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Processing Fees</span>
      <span className="font-medium text-foreground">{formatCurrency(costBreakdown.processingFees)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Passport Fee</span>
      <span className="font-medium text-foreground">{formatCurrency(costBreakdown.passportFee)}</span>
    </div>
    {costBreakdown.sharedFees?.map((fee, index) => (
      <div key={index} className="flex justify-between">
        <span className="text-muted-foreground">{fee.name}</span>
        <span className="font-medium text-foreground">{formatCurrency(fee.amount)}</span>
      </div>
    ))}
  </>
);

const InvestmentCard = ({ program }: InvestmentCardProps) => {
  const costBreakdown = program.costBreakdown;

  const hasInvestmentRoutes = costBreakdown?.investmentRoutes && costBreakdown.investmentRoutes.length > 0;
  const hasLegacyBothOptions = !hasInvestmentRoutes && costBreakdown?.donationAmount && costBreakdown?.realEstateMin;

  const calculateRouteTotal = (route: InvestmentRoute) => {
    if (!costBreakdown) return route.amount;
    let total = route.amount;
    total += costBreakdown.dueDiligence;
    total += costBreakdown.processingFees;
    total += costBreakdown.passportFee;
    if (costBreakdown.sharedFees) {
      costBreakdown.sharedFees.forEach(fee => total += fee.amount);
    }
    return total;
  };

  const calculateDonationTotal = () => {
    if (!costBreakdown?.donationAmount) return 0;
    let total = costBreakdown.donationAmount;
    total += costBreakdown.dueDiligence;
    total += costBreakdown.processingFees;
    total += costBreakdown.passportFee;
    if (costBreakdown.sharedFees) {
      costBreakdown.sharedFees.forEach(fee => total += fee.amount);
    }
    return total;
  };

  const calculateRealEstateTotal = () => {
    if (!costBreakdown?.realEstateMin) return 0;
    let total = costBreakdown.realEstateMin;
    total += costBreakdown.dueDiligence;
    total += costBreakdown.processingFees;
    total += costBreakdown.passportFee;
    if (costBreakdown.sharedFees) {
      costBreakdown.sharedFees.forEach(fee => total += fee.amount);
    }
    return total;
  };

  const calculateSingleTotal = () => {
    if (!costBreakdown) return program.minInvestment;
    let total = 0;
    if (costBreakdown.donationAmount) total += costBreakdown.donationAmount;
    else if (costBreakdown.realEstateMin) total += costBreakdown.realEstateMin;
    total += costBreakdown.dueDiligence;
    total += costBreakdown.processingFees;
    total += costBreakdown.passportFee;
    if (costBreakdown.sharedFees) {
      costBreakdown.sharedFees.forEach(fee => total += fee.amount);
    }
    return total;
  };

  const getLowestInvestment = () => {
    if (hasInvestmentRoutes && costBreakdown?.investmentRoutes) {
      const routeAmounts = costBreakdown.investmentRoutes.map(r => r.amount);
      return Math.min(...routeAmounts, program.minInvestment);
    }
    return Math.min(
      costBreakdown?.donationAmount || Infinity,
      costBreakdown?.realEstateMin || Infinity,
      program.minInvestment,
    );
  };

  const getRouteIcon = (route: InvestmentRoute) => {
    if (route.icon && iconMap[route.icon]) {
      const IconComponent = iconMap[route.icon];
      return <IconComponent className="w-3 h-3" />;
    }
    const name = route.name.toLowerCase();
    if (name.includes('donat')) return <iconMap.Heart className="w-3 h-3" />;
    if (name.includes('real') || name.includes('property')) return <iconMap.Home className="w-3 h-3" />;
    if (name.includes('bank') || name.includes('deposit')) return <iconMap.Building className="w-3 h-3" />;
    if (name.includes('business')) return <iconMap.Briefcase className="w-3 h-3" />;
    if (name.includes('fund') || name.includes('invest')) return <iconMap.PiggyBank className="w-3 h-3" />;
    if (name.includes('bond') || name.includes('treasury')) return <iconMap.Landmark className="w-3 h-3" />;
    return <DollarSign className="w-3 h-3" />;
  };

  const commitmentFee = Math.round(program.minInvestment * COMMITMENT_FEE_RATE);
  const totalPassportCapitalFees = CONSULTATION_FEE + commitmentFee;

  const renderInvestmentRoutes = () => {
    if (!costBreakdown?.investmentRoutes || costBreakdown.investmentRoutes.length === 0) return null;

    const routes = costBreakdown.investmentRoutes;

    if (routes.length === 1) {
      const route = routes[0];
      return (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{route.label || route.name}</span>
            <span className="font-medium text-foreground">{formatCurrency(route.amount)}</span>
          </div>
          <SharedFeesDisplay costBreakdown={costBreakdown} />
          <Separator />
          <div className="flex justify-between font-semibold">
            <span className="text-foreground">Total Program Cost</span>
            <span className="text-primary">{formatCurrency(calculateRouteTotal(route))}</span>
          </div>
        </div>
      );
    }

    const defaultRoute = routes[0].name.toLowerCase().replace(/\s+/g, '-');

    return (
      <Tabs defaultValue={defaultRoute} className="w-full">
        <TabsList className={`grid w-full mb-4 h-auto ${routes.length === 2 ? 'grid-cols-2' : routes.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {routes.map((route) => {
            const routeKey = route.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <TabsTrigger
                key={routeKey}
                value={routeKey}
                className="text-xs py-2 px-1.5 flex flex-col gap-0.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="flex items-center gap-1">
                  {getRouteIcon(route)}
                  <span className="truncate">{route.name}</span>
                </span>
                <span className="text-[10px] opacity-80">
                  {formatCurrency(route.amount)}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {routes.map((route) => {
          const routeKey = route.name.toLowerCase().replace(/\s+/g, '-');
          return (
            <TabsContent key={routeKey} value={routeKey} className="mt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{route.label || route.name}</span>
                  <span className="font-medium text-foreground">{formatCurrency(route.amount)}</span>
                </div>
                <SharedFeesDisplay costBreakdown={costBreakdown} />
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total ({route.name})</span>
                  <span className="text-primary">{formatCurrency(calculateRouteTotal(route))}</span>
                </div>
              </div>
            </TabsContent>
          );
        })}

        <p className="text-xs text-muted-foreground text-center mt-3 italic">
          Choose ONE investment route — not both
        </p>
      </Tabs>
    );
  };

  const renderLegacyTabs = () => (
    <Tabs defaultValue="donation" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 h-auto">
        <TabsTrigger
          value="donation"
          className="text-xs py-2 px-2 flex flex-col gap-0.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <span className="flex items-center gap-1">
            <iconMap.Heart className="w-3 h-3" />
            Donation
          </span>
          <span className="text-[10px] opacity-80">
            From {formatCurrency(costBreakdown!.donationAmount!)}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="realestate"
          className="text-xs py-2 px-2 flex flex-col gap-0.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <span className="flex items-center gap-1">
            <iconMap.Home className="w-3 h-3" />
            Real Estate
          </span>
          <span className="text-[10px] opacity-80">
            From {formatCurrency(costBreakdown!.realEstateMin!)}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="donation" className="mt-0">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Contribution</span>
            <span className="font-medium text-foreground">{formatCurrency(costBreakdown!.donationAmount!)}</span>
          </div>
          <SharedFeesDisplay costBreakdown={costBreakdown!} />
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span className="text-foreground">Total (Donation)</span>
            <span className="text-primary">{formatCurrency(calculateDonationTotal())}</span>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="realestate" className="mt-0">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Property Investment (min)</span>
            <span className="font-medium text-foreground">{formatCurrency(costBreakdown!.realEstateMin!)}+</span>
          </div>
          <SharedFeesDisplay costBreakdown={costBreakdown!} />
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span className="text-foreground">Total (Real Estate)</span>
            <span className="text-primary">{formatCurrency(calculateRealEstateTotal())}+</span>
          </div>
        </div>
      </TabsContent>

      <p className="text-xs text-muted-foreground text-center mt-3 italic">
        Choose ONE investment route — not both
      </p>
    </Tabs>
  );

  const renderSingleBreakdown = () => (
    <div className="space-y-2 text-sm">
      {costBreakdown!.donationAmount && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Donation</span>
          <span className="font-medium text-foreground">{formatCurrency(costBreakdown!.donationAmount)}</span>
        </div>
      )}
      {costBreakdown!.realEstateMin && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">Real Estate (min)</span>
          <span className="font-medium text-foreground">{formatCurrency(costBreakdown!.realEstateMin)}</span>
        </div>
      )}
      <SharedFeesDisplay costBreakdown={costBreakdown!} />
      <Separator />
      <div className="flex justify-between font-semibold">
        <span className="text-foreground">Total Program Cost</span>
        <span className="text-primary">{formatCurrency(calculateSingleTotal())}</span>
      </div>
    </div>
  );

  const getInvestmentTypeLabel = () => {
    if (hasInvestmentRoutes && costBreakdown?.investmentRoutes) {
      const routeNames = costBreakdown.investmentRoutes.map(r => r.name);
      if (routeNames.length <= 2) {
        return routeNames.join(' or ');
      }
      return 'Multiple Options';
    }
    if (hasLegacyBothOptions) {
      return 'Donation or Real Estate';
    }
    return program.investmentType;
  };

  return (
    <Card className="sticky top-28 border-2 border-primary/20 shadow-royal">
      <CardHeader className="gradient-royal text-primary-foreground rounded-t-lg pb-4">
        <Badge className="w-fit bg-background/20 text-primary-foreground mb-2">
          {program.programType === 'citizenship' ? 'Citizenship' : 'Residency'} Investment
        </Badge>
        <CardTitle className="font-display text-2xl">
          Investment from
        </CardTitle>
        <p className="text-4xl font-bold">
          {formatCurrency(getLowestInvestment())}
        </p>
        <p className="text-sm text-primary-foreground/80">
          {getInvestmentTypeLabel()}
        </p>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {costBreakdown && (
          <>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                {(hasInvestmentRoutes && costBreakdown.investmentRoutes!.length > 1) || hasLegacyBothOptions
                  ? 'Choose Your Investment Route'
                  : 'Cost Breakdown'}
              </h4>

              {hasInvestmentRoutes ? (
                renderInvestmentRoutes()
              ) : hasLegacyBothOptions ? (
                renderLegacyTabs()
              ) : (
                renderSingleBreakdown()
              )}
            </div>

            <Separator />
          </>
        )}

        <div className="p-4 bg-secondary rounded-lg border border-border">
          <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-primary" />
            Passport Capital Fees
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            Due at Application Submission
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consultation Fee</span>
              <span className="font-medium text-foreground">${CONSULTATION_FEE}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commitment Fee ({(COMMITMENT_FEE_RATE * 100).toFixed(1)}%)</span>
              <span className="font-medium text-foreground">{formatCurrency(commitmentFee)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span className="text-foreground">Due at Submission</span>
              <span className="text-accent">{formatCurrency(totalPassportCapitalFees)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {program.familyInclusion && (
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-accent shrink-0" />
              <span className="text-foreground">Family members included</span>
            </div>
          )}
          {program.dualCitizenship && (
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-accent shrink-0" />
              <span className="text-foreground">Dual citizenship allowed</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-accent shrink-0" />
            <span className="text-foreground">{program.visaFreeCountries}+ visa-free countries</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            asChild
            size="lg"
            className="w-full gradient-royal text-primary-foreground"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-2 w-4 h-4" />
              Start Application
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc]/10"
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <TelegramIcon className="mr-2 w-4 h-4" />
              Chat on Telegram
            </a>
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          WhatsApp available 24/7 • Secure & confidential
        </p>
      </CardContent>
    </Card>
  );
};

export default InvestmentCard;
