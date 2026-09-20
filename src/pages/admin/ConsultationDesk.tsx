import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Moon,
  Sun,
  CheckCircle2,
  AlertTriangle,
  Users,
  Lightbulb,
  MessageCircle,
  Printer,
  DollarSign,
  Clock,
  Globe,
  Shield,
  Bitcoin,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface InvestmentOption {
  type: string;
  amount: number;
  description: string;
  recommended: boolean;
}

interface Objection {
  objection: string;
  response: string;
}

interface ProgramData {
  id: string;
  country: string;
  flag_emoji: string | null;
  region: string;
  program_type: string;
  program_name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  highlights: string[] | null;
  min_investment: number;
  processing_time: string | null;
  visa_free_countries: number | null;
  investment_options: InvestmentOption[] | null;
  required_documents: string[] | null;
  due_diligence_stages: string[] | null;
  min_age: number | null;
  criminal_record_allowed: boolean;
  net_worth_required: string | null;
  source_of_funds_required: boolean;
  eligible_nationalities: string[] | null;
  excluded_nationalities: string[] | null;
  family_included: boolean;
  spouse_included: boolean;
  children_age_limit: number | null;
  parents_included: boolean;
  siblings_included: boolean;
  family_notes: string | null;
  benefits: string[] | null;
  travel_access_highlights: string[] | null;
  crypto_accepted: boolean;
  crypto_notes: string | null;
  consultant_pitch: string | null;
  ideal_client_profile: string | null;
  key_talking_points: string[] | null;
  objections: Objection[] | null;
  competitor_comparison: string | null;
  red_flags: string[] | null;
  closing_tips: string | null;
  is_active: boolean;
  is_featured: boolean;
}

const STORAGE_KEY = 'consultation-desk-last-program';

const TYPE_OPTIONS = ['All', 'Citizenship', 'Residency'] as const;
const REGION_OPTIONS = ['All', 'Caribbean', 'Europe', 'Middle East'] as const;

function mapProgram(row: Record<string, unknown>): ProgramData {
  return {
    id: row.id as string,
    country: row.country as string,
    flag_emoji: (row.flag_emoji as string) ?? null,
    region: row.region as string,
    program_type: row.program_type as string,
    program_name: row.program_name as string,
    slug: row.slug as string,
    tagline: (row.tagline as string) ?? null,
    description: (row.description as string) ?? null,
    highlights: (row.highlights as string[]) ?? null,
    min_investment: row.min_investment as number,
    processing_time: (row.processing_time as string) ?? null,
    visa_free_countries: (row.visa_free_countries as number) ?? null,
    investment_options: (row.investment_options as InvestmentOption[]) ?? null,
    required_documents: (row.required_documents as string[]) ?? null,
    due_diligence_stages: (row.due_diligence_stages as string[]) ?? null,
    min_age: (row.min_age as number) ?? null,
    criminal_record_allowed: (row.criminal_record_allowed as boolean) ?? false,
    net_worth_required: (row.net_worth_required as string) ?? null,
    source_of_funds_required: (row.source_of_funds_required as boolean) ?? true,
    eligible_nationalities: (row.eligible_nationalities as string[]) ?? null,
    excluded_nationalities: (row.excluded_nationalities as string[]) ?? null,
    family_included: (row.family_included as boolean) ?? true,
    spouse_included: (row.spouse_included as boolean) ?? true,
    children_age_limit: (row.children_age_limit as number) ?? null,
    parents_included: (row.parents_included as boolean) ?? false,
    siblings_included: (row.siblings_included as boolean) ?? false,
    family_notes: (row.family_notes as string) ?? null,
    benefits: (row.benefits as string[]) ?? null,
    travel_access_highlights: (row.travel_access_highlights as string[]) ?? null,
    crypto_accepted: (row.crypto_accepted as boolean) ?? false,
    crypto_notes: (row.crypto_notes as string) ?? null,
    consultant_pitch: (row.consultant_pitch as string) ?? null,
    ideal_client_profile: (row.ideal_client_profile as string) ?? null,
    key_talking_points: (row.key_talking_points as string[]) ?? null,
    objections: (row.objections as Objection[]) ?? null,
    competitor_comparison: (row.competitor_comparison as string) ?? null,
    red_flags: (row.red_flags as string[]) ?? null,
    closing_tips: (row.closing_tips as string) ?? null,
    is_active: (row.is_active as boolean) ?? true,
    is_featured: (row.is_featured as boolean) ?? false,
  };
}

const ConsultationDesk = () => {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<string>('All');
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY);
  });
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());
  const [compare1, setCompare1] = useState<string>('');
  const [compare2, setCompare2] = useState<string>('');

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['consultation-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data as Record<string, unknown>[]).map(mapProgram);
    },
  });

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchSearch =
        !search ||
        p.country.toLowerCase().includes(search.toLowerCase());
      const matchType =
        activeType === 'All' ||
        p.program_type.toLowerCase() === activeType.toLowerCase();
      const matchRegion =
        activeRegion === 'All' ||
        p.region.toLowerCase().replace(/\s+/g, ' ') ===
          activeRegion.toLowerCase();
      return matchSearch && matchType && matchRegion;
    });
  }, [programs, search, activeType, activeRegion]);

  const selected = useMemo(() => {
    if (!selectedSlug) return null;
    return programs.find((p) => p.slug === selectedSlug) ?? null;
  }, [programs, selectedSlug]);

  useEffect(() => {
    if (selectedSlug) {
      localStorage.setItem(STORAGE_KEY, selectedSlug);
    }
  }, [selectedSlug]);

  useEffect(() => {
    setCheckedDocs(new Set());
    setCompare1('');
    setCompare2('');
  }, [selectedSlug]);

  const handleSelectProgram = (slug: string) => {
    setSelectedSlug(slug);
  };

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(doc)) next.delete(doc);
      else next.add(doc);
      return next;
    });
  };

  const comparisonPrograms = useMemo(() => {
    if (!selected) return [];
    return programs.filter(
      (p) =>
        p.slug !== selected.slug &&
        (p.region === selected.region ||
          p.program_type === selected.program_type),
    );
  }, [programs, selected]);

  const compare1Data = useMemo(
    () => programs.find((p) => p.slug === compare1) ?? null,
    [programs, compare1],
  );
  const compare2Data = useMemo(
    () => programs.find((p) => p.slug === compare2) ?? null,
    [programs, compare2],
  );

  const panelBg = isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const rightBg = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const cardDark = isDark ? 'border-gray-700 bg-gray-800 text-white' : '';
  const inputDark = isDark
    ? 'border-gray-600 bg-gray-800 text-gray-100 placeholder:text-gray-500'
    : '';

  return (
    <div className={`flex h-screen ${isDark ? 'dark' : ''}`}>
      {/* LEFT PANEL */}
      <div
        className={`w-80 shrink-0 border-r overflow-y-auto ${panelBg}`}
      >
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`pl-9 ${inputDark}`}
            />
          </div>

          <div className="flex gap-1 flex-wrap">
            {TYPE_OPTIONS.map((t) => (
              <Button
                key={t}
                size="sm"
                variant={activeType === t ? 'default' : 'outline'}
                onClick={() => setActiveType(t)}
                className="text-xs"
              >
                {t}
              </Button>
            ))}
          </div>

          <div className="flex gap-1 flex-wrap">
            {REGION_OPTIONS.map((r) => (
              <Button
                key={r}
                size="sm"
                variant={activeRegion === r ? 'default' : 'outline'}
                onClick={() => setActiveRegion(r)}
                className="text-xs"
              >
                {r}
              </Button>
            ))}
          </div>

          <Separator />

          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading programs...</p>
          )}

          <div className="space-y-2">
            {filtered.map((p) => (
              <Card
                key={p.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSlug === p.slug
                    ? 'ring-2 ring-amber-400'
                    : ''
                } ${cardDark}`}
                onClick={() => handleSelectProgram(p.slug)}
              >
                <CardContent className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base">
                      {p.flag_emoji} {p.country}
                    </span>
                    <Badge
                      className={`text-xs ${
                        p.program_type === 'citizenship'
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {p.program_type}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(p.min_investment)}
                  </div>
                  {p.processing_time && (
                    <div className="text-sm text-muted-foreground">
                      {p.processing_time}
                    </div>
                  )}
                  {p.visa_free_countries != null && (
                    <div className="text-sm text-muted-foreground">
                      {p.visa_free_countries} visa-free countries
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={`flex-1 flex flex-col overflow-hidden ${rightBg}`}>
        {/* Dark mode toggle */}
        <div className="flex items-center justify-between px-6 pt-4">
          <div />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark((d) => !d)}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Quick Stats Bar */}
        <div className={`px-6 py-3 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          {!selected ? (
            <p className="text-base text-muted-foreground">
              Select a program from the left panel
            </p>
          ) : (
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-500" />
                <span className="text-lg font-bold">{formatCurrency(selected.min_investment)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-bold">{selected.processing_time ?? 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-500" />
                <span className="text-lg font-bold">
                  {selected.visa_free_countries != null
                    ? `${selected.visa_free_countries} countries`
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <span className="text-lg font-bold capitalize">{selected.program_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bitcoin className="h-5 w-5 text-orange-500" />
                <span className="text-lg font-bold">
                  {selected.crypto_accepted ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-y-auto">
          {!selected ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-muted-foreground">
                Choose a program to view details
              </p>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="p-6">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="pitch">Pitch</TabsTrigger>
                <TabsTrigger value="objections">Objections</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
              </TabsList>

              {/* TAB: Overview */}
              <TabsContent value="overview" className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-5xl">{selected.flag_emoji}</div>
                  <h1 className="text-3xl font-bold">{selected.country}</h1>
                  {selected.tagline && (
                    <p className="text-lg text-muted-foreground">{selected.tagline}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className={cardDark}>
                    <CardContent className="p-4 flex flex-col items-center gap-1">
                      <DollarSign className="h-6 w-6 text-amber-500" />
                      <span className="text-xs text-muted-foreground">Min Investment</span>
                      <span className="text-lg font-bold">{formatCurrency(selected.min_investment)}</span>
                    </CardContent>
                  </Card>
                  <Card className={cardDark}>
                    <CardContent className="p-4 flex flex-col items-center gap-1">
                      <Clock className="h-6 w-6 text-blue-500" />
                      <span className="text-xs text-muted-foreground">Processing Time</span>
                      <span className="text-lg font-bold">{selected.processing_time ?? 'N/A'}</span>
                    </CardContent>
                  </Card>
                  <Card className={cardDark}>
                    <CardContent className="p-4 flex flex-col items-center gap-1">
                      <Globe className="h-6 w-6 text-green-500" />
                      <span className="text-xs text-muted-foreground">Visa-Free Countries</span>
                      <span className="text-lg font-bold">
                        {selected.visa_free_countries != null ? selected.visa_free_countries : 'N/A'}
                      </span>
                    </CardContent>
                  </Card>
                  <Card className={cardDark}>
                    <CardContent className="p-4 flex flex-col items-center gap-1">
                      <Shield className="h-6 w-6 text-purple-500" />
                      <span className="text-xs text-muted-foreground">Program Type</span>
                      <span className="text-lg font-bold capitalize">{selected.program_type}</span>
                    </CardContent>
                  </Card>
                </div>

                {selected.description && (
                  <div>
                    <p className="text-base leading-relaxed">{selected.description}</p>
                  </div>
                )}

                {selected.highlights && selected.highlights.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Highlights</h2>
                    <ul className="space-y-1">
                      {selected.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-base">
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selected.investment_options && selected.investment_options.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Investment Options</h2>
                    <div className="grid gap-3 md:grid-cols-2">
                      {selected.investment_options.map((opt, i) => (
                        <Card key={i} className={cardDark}>
                          <CardContent className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-base">{opt.type}</span>
                              {opt.recommended && (
                                <Badge className="bg-green-500 text-white hover:bg-green-600">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <div className="text-lg font-bold text-amber-600">
                              {formatCurrency(opt.amount)}
                            </div>
                            <p className="text-sm text-muted-foreground">{opt.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <Card className={cardDark}>
                  <CardHeader>
                    <CardTitle className="text-lg">Family Inclusion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-base">
                    <div className="flex items-center justify-between">
                      <span>Spouse included</span>
                      <Badge variant={selected.spouse_included ? 'default' : 'outline'}>
                        {selected.spouse_included ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Children age limit</span>
                      <Badge variant="outline">
                        {selected.children_age_limit != null
                          ? `Up to ${selected.children_age_limit}`
                          : 'N/A'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Parents included</span>
                      <Badge variant={selected.parents_included ? 'default' : 'outline'}>
                        {selected.parents_included ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Siblings included</span>
                      <Badge variant={selected.siblings_included ? 'default' : 'outline'}>
                        {selected.siblings_included ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    {selected.family_notes && (
                      <p className="text-sm text-muted-foreground pt-2">{selected.family_notes}</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB: Requirements */}
              <TabsContent value="requirements" className="space-y-6">
                <Card className={cardDark}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" /> Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-base">
                    {selected.min_age != null && (
                      <div className="flex justify-between">
                        <span>Minimum age</span>
                        <span className="font-semibold">{selected.min_age}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Criminal record allowed</span>
                      <span className="font-semibold">
                        {selected.criminal_record_allowed ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {selected.net_worth_required && (
                      <div className="flex justify-between">
                        <span>Net worth required</span>
                        <span className="font-semibold">{selected.net_worth_required}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Source of funds required</span>
                      <span className="font-semibold">
                        {selected.source_of_funds_required ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {selected.eligible_nationalities && selected.eligible_nationalities.length > 0 && (
                      <div>
                        <span className="font-medium">Eligible nationalities:</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selected.eligible_nationalities.join(', ')}
                        </p>
                      </div>
                    )}
                    {selected.excluded_nationalities && selected.excluded_nationalities.length > 0 && (
                      <div>
                        <span className="font-medium">Excluded nationalities:</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selected.excluded_nationalities.join(', ')}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {selected.required_documents && selected.required_documents.length > 0 && (
                  <Card className={cardDark}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" /> Required Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selected.required_documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Checkbox
                            checked={checkedDocs.has(doc)}
                            onCheckedChange={() => toggleDoc(doc)}
                          />
                          <span
                            className={`text-base ${
                              checkedDocs.has(doc)
                                ? 'line-through text-muted-foreground'
                                : ''
                            }`}
                          >
                            {doc}
                          </span>
                        </div>
                      ))}
                      <div className="pt-2 text-sm text-muted-foreground">
                        {checkedDocs.size} / {selected.required_documents.length} confirmed
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selected.due_diligence_stages && selected.due_diligence_stages.length > 0 && (
                  <Card className={cardDark}>
                    <CardHeader>
                      <CardTitle className="text-lg">Due Diligence Stages</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selected.due_diligence_stages.map((stage, i) => (
                        <div key={i} className="flex items-start gap-3 text-base">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">
                            {i + 1}
                          </span>
                          <span>{stage}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {selected.red_flags && selected.red_flags.length > 0 && (
                  <div className="rounded-lg border border-red-300 bg-red-50 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-red-600 font-semibold text-lg">
                      <AlertTriangle className="h-5 w-5" /> Red Flags
                    </div>
                    {selected.red_flags.map((flag, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-red-700 text-base"
                      >
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        {flag}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* TAB: Pitch */}
              <TabsContent value="pitch" className="space-y-6">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-0 right-0"
                    onClick={() => window.print()}
                  >
                    <Printer className="h-4 w-4 mr-1" /> Print
                  </Button>
                </div>

                {selected.ideal_client_profile && (
                  <Card className={cardDark}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" /> Ideal Client Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">{selected.ideal_client_profile}</p>
                    </CardContent>
                  </Card>
                )}

                {selected.consultant_pitch && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Consultant Pitch</h2>
                    <p className="text-lg leading-relaxed">{selected.consultant_pitch}</p>
                  </div>
                )}

                {selected.key_talking_points && selected.key_talking_points.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Key Talking Points</h2>
                    {selected.key_talking_points.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="text-base font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selected.closing_tips && (
                  <Card className={cardDark}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" /> Closing Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">{selected.closing_tips}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* TAB: Objections */}
              <TabsContent value="objections" className="space-y-4">
                {selected.objections && selected.objections.length > 0 ? (
                  <Accordion type="multiple" className="w-full">
                    {selected.objections.map((obj, i) => (
                      <AccordionItem key={i} value={`obj-${i}`}>
                        <AccordionTrigger className="text-amber-600 font-bold text-base hover:no-underline">
                          <span className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 shrink-0" />
                            {obj.objection}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-base leading-relaxed pl-7">
                            {obj.response}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-base text-muted-foreground">No objection handling data available.</p>
                )}
              </TabsContent>

              {/* TAB: Compare */}
              <TabsContent value="compare" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Compare with</label>
                    <Select value={compare1} onValueChange={setCompare1}>
                      <SelectTrigger className={inputDark}>
                        <SelectValue placeholder="Select program..." />
                      </SelectTrigger>
                      <SelectContent>
                        {comparisonPrograms.map((p) => (
                          <SelectItem key={p.slug} value={p.slug}>
                            {p.flag_emoji} {p.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Also compare with</label>
                    <Select value={compare2} onValueChange={setCompare2}>
                      <SelectTrigger className={inputDark}>
                        <SelectValue placeholder="Select program..." />
                      </SelectTrigger>
                      <SelectContent>
                        {comparisonPrograms
                          .filter((p) => p.slug !== compare1)
                          .map((p) => (
                            <SelectItem key={p.slug} value={p.slug}>
                              {p.flag_emoji} {p.country}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {(compare1Data || compare2Data) && (
                  <Card className={cardDark}>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Metric</TableHead>
                            <TableHead className="font-semibold">
                              {selected.flag_emoji} {selected.country}
                            </TableHead>
                            {compare1Data && (
                              <TableHead className="font-semibold">
                                {compare1Data.flag_emoji} {compare1Data.country}
                              </TableHead>
                            )}
                            {compare2Data && (
                              <TableHead className="font-semibold">
                                {compare2Data.flag_emoji} {compare2Data.country}
                              </TableHead>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(() => {
                            const rows = [
                              {
                                label: 'Min Investment',
                                values: [
                                  selected.min_investment,
                                  compare1Data?.min_investment,
                                  compare2Data?.min_investment,
                                ],
                                format: (v: number) => formatCurrency(v),
                                lower: true,
                              },
                              {
                                label: 'Processing Time',
                                values: [
                                  selected.processing_time,
                                  compare1Data?.processing_time,
                                  compare2Data?.processing_time,
                                ],
                                format: (v: string) => v ?? 'N/A',
                                lower: false,
                              },
                              {
                                label: 'Visa-Free Countries',
                                values: [
                                  selected.visa_free_countries,
                                  compare1Data?.visa_free_countries,
                                  compare2Data?.visa_free_countries,
                                ],
                                format: (v: number) => (v != null ? String(v) : 'N/A'),
                                lower: false,
                              },
                              {
                                label: 'Family Included',
                                values: [
                                  selected.family_included,
                                  compare1Data?.family_included,
                                  compare2Data?.family_included,
                                ],
                                format: (v: boolean) => (v ? 'Yes' : 'No'),
                                lower: false,
                              },
                              {
                                label: 'Crypto Accepted',
                                values: [
                                  selected.crypto_accepted,
                                  compare1Data?.crypto_accepted,
                                  compare2Data?.crypto_accepted,
                                ],
                                format: (v: boolean) => (v ? 'Yes' : 'No'),
                                lower: false,
                              },
                              {
                                label: 'Program Type',
                                values: [
                                  selected.program_type,
                                  compare1Data?.program_type,
                                  compare2Data?.program_type,
                                ],
                                format: (v: string) => v ?? 'N/A',
                                lower: false,
                              },
                            ];

                            return rows.map((row) => {
                              const numericValues = row.values
                                .filter((v): v is number => typeof v === 'number');
                              const bestNumeric =
                                numericValues.length > 0
                                  ? row.lower
                                    ? Math.min(...numericValues)
                                    : Math.max(...numericValues)
                                  : null;

                              return (
                                <TableRow key={row.label}>
                                  <TableCell className="font-medium">{row.label}</TableCell>
                                  {row.values.map((val, idx) => {
                                    const isWinner =
                                      bestNumeric != null &&
                                      typeof val === 'number' &&
                                      val === bestNumeric;
                                    return (
                                      <TableCell
                                        key={idx}
                                        className={
                                          isWinner ? 'bg-green-50 dark:bg-green-900/30' : ''
                                        }
                                      >
                                        {val != null
                                          ? row.format(val as never)
                                          : 'N/A'}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            });
                          })()}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {!compare1Data && !compare2Data && (
                  <p className="text-base text-muted-foreground">
                    Select programs above to compare.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationDesk;
