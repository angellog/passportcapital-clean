import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Power, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { formatCurrency, regions, programTypes } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type ProgramRow = Tables<'programs'>;

const emptyForm: Record<string, unknown> = {
  country: '',
  flag_emoji: '',
  slug: '',
  program_name: '',
  program_type: 'citizenship',
  region: 'caribbean',
  tagline: '',
  description: '',
  min_investment: 0,
  max_investment: null,
  advisory_fee_min: null,
  advisory_fee_max: null,
  processing_time: '',
  visa_free_countries: null,
  success_rate: '',
  investment_options: null,
  highlights: null,
  min_age: 18,
  criminal_record_allowed: false,
  net_worth_required: '',
  source_of_funds_required: true,
  eligible_nationalities: null,
  excluded_nationalities: null,
  required_documents: null,
  due_diligence_stages: null,
  family_included: true,
  spouse_included: true,
  children_age_limit: null,
  parents_included: false,
  siblings_included: false,
  family_notes: '',
  benefits: null,
  travel_access_highlights: null,
  crypto_accepted: false,
  crypto_notes: '',
  consultant_pitch: '',
  ideal_client_profile: '',
  key_talking_points: null,
  objections: null,
  competitor_comparison: '',
  red_flags: null,
  closing_tips: '',
  is_active: true,
  is_featured: false,
  sort_order: 0,
};

function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[] | null;
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState('');
  const tags = value ?? [];

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const remove = (idx: number) => {
    onChange(tags.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button type="button" variant="outline" size="sm" onClick={add}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="cursor-pointer hover:bg-red-100"
            onClick={() => remove(i)}
          >
            {tag} ×
          </Badge>
        ))}
      </div>
    </div>
  );
}

function JsonInput({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  placeholder?: string;
  rows?: number;
}) {
  const [text, setText] = useState(() => {
    try {
      return value ? JSON.stringify(value, null, 2) : '';
    } catch {
      return '';
    }
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (!val.trim()) {
      onChange(null);
      setError('');
      return;
    }
    try {
      onChange(JSON.parse(val));
      setError('');
    } catch {
      setError('Invalid JSON');
    }
  };

  return (
    <div className="space-y-1">
      <Textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className="font-mono text-xs"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ProgramForm({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (field: string, value: unknown) => void;
}) {
  const ch = (field: string, value: unknown) => onChange(field, value);
  const val = (field: string) => (data[field] ?? '') as string | number | readonly string[];
  const num = (field: string) => (data[field] as number) ?? 0;
  const bool = (field: string) => !!data[field];
  const tags = (field: string) => (data[field] as string[] | null) ?? null;

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="flex flex-wrap h-auto gap-1">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="investment">Investment</TabsTrigger>
        <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="family">Family</TabsTrigger>
        <TabsTrigger value="benefits">Benefits</TabsTrigger>
        <TabsTrigger value="crypto">Crypto</TabsTrigger>
        <TabsTrigger value="consultation">Consultation</TabsTrigger>
        <TabsTrigger value="display">Display</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="grid gap-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Country *</Label>
            <Input value={val('country')} onChange={(e) => ch('country', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Program Name *</Label>
            <Input value={val('program_name')} onChange={(e) => ch('program_name', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Flag Emoji</Label>
            <Input value={val('flag_emoji') as string} onChange={(e) => ch('flag_emoji', e.target.value)} placeholder="🇰🇳" />
          </div>
          <div className="space-y-2">
            <Label>URL Slug *</Label>
            <Input value={val('slug') as string} onChange={(e) => ch('slug', e.target.value)} placeholder="st-kitts-nevis" />
          </div>
          <div className="space-y-2">
            <Label>Program Type *</Label>
            <Select value={val('program_type') as string} onValueChange={(v) => ch('program_type', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="citizenship">Citizenship</SelectItem>
                <SelectItem value="residency">Residency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Region *</Label>
            <Select value={val('region') as string} onValueChange={(v) => ch('region', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {regions.filter((r) => r.id !== 'all').map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input value={val('tagline') as string} onChange={(e) => ch('tagline', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={val('description') as string} onChange={(e) => ch('description', e.target.value)} rows={3} />
        </div>
      </TabsContent>

      <TabsContent value="investment" className="grid gap-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Min Investment ($) *</Label>
            <Input type="number" value={num('min_investment')} onChange={(e) => ch('min_investment', Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Max Investment ($)</Label>
            <Input type="number" value={val('max_investment') as string} onChange={(e) => ch('max_investment', e.target.value ? Number(e.target.value) : null)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Advisory Fee Min ($)</Label>
            <Input type="number" value={val('advisory_fee_min') as string} onChange={(e) => ch('advisory_fee_min', e.target.value ? Number(e.target.value) : null)} />
          </div>
          <div className="space-y-2">
            <Label>Advisory Fee Max ($)</Label>
            <Input type="number" value={val('advisory_fee_max') as string} onChange={(e) => ch('advisory_fee_max', e.target.value ? Number(e.target.value) : null)} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Processing Time</Label>
            <Input value={val('processing_time') as string} onChange={(e) => ch('processing_time', e.target.value)} placeholder="2-4 months" />
          </div>
          <div className="space-y-2">
            <Label>Visa-Free Countries</Label>
            <Input type="number" value={val('visa_free_countries') as string} onChange={(e) => ch('visa_free_countries', e.target.value ? Number(e.target.value) : null)} />
          </div>
          <div className="space-y-2">
            <Label>Success Rate</Label>
            <Input value={val('success_rate') as string} onChange={(e) => ch('success_rate', e.target.value)} placeholder="99%" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Investment Options (JSON)</Label>
          <JsonInput value={val('investment_options')} onChange={(v) => ch('investment_options', v)} placeholder='[{"type": "Donation", "amount": 250000}]' rows={6} />
        </div>
      </TabsContent>

      <TabsContent value="eligibility" className="grid gap-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Min Age</Label>
            <Input type="number" value={num('min_age')} onChange={(e) => ch('min_age', Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Net Worth Required</Label>
            <Input value={val('net_worth_required') as string} onChange={(e) => ch('net_worth_required', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Checkbox checked={bool('criminal_record_allowed')} onCheckedChange={(v) => ch('criminal_record_allowed', !!v)} />
            <Label>Criminal Record Allowed</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={bool('source_of_funds_required')} onCheckedChange={(v) => ch('source_of_funds_required', !!v)} />
            <Label>Source of Funds Required</Label>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Eligible Nationalities (blank = all)</Label>
          <TagInput value={tags('eligible_nationalities')} onChange={(v) => ch('eligible_nationalities', v)} placeholder="Type and press Enter" />
        </div>
        <div className="space-y-2">
          <Label>Excluded Nationalities</Label>
          <TagInput value={tags('excluded_nationalities')} onChange={(v) => ch('excluded_nationalities', v)} placeholder="Type and press Enter" />
        </div>
      </TabsContent>

      <TabsContent value="documents" className="grid gap-4 mt-4">
        <div className="space-y-2">
          <Label>Required Documents</Label>
          <TagInput value={tags('required_documents')} onChange={(v) => ch('required_documents', v)} placeholder="Add document name, press Enter" />
        </div>
        <div className="space-y-2">
          <Label>Due Diligence Stages</Label>
          <TagInput value={tags('due_diligence_stages')} onChange={(v) => ch('due_diligence_stages', v)} placeholder="Add stage name, press Enter" />
        </div>
      </TabsContent>

      <TabsContent value="family" className="grid gap-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Checkbox checked={bool('family_included')} onCheckedChange={(v) => ch('family_included', !!v)} />
            <Label>Family Included</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={bool('spouse_included')} onCheckedChange={(v) => ch('spouse_included', !!v)} />
            <Label>Spouse Included</Label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Children Age Limit</Label>
            <Input type="number" value={val('children_age_limit') as string} onChange={(e) => ch('children_age_limit', e.target.value ? Number(e.target.value) : null)} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={bool('parents_included')} onCheckedChange={(v) => ch('parents_included', !!v)} />
            <Label>Parents Included</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={bool('siblings_included')} onCheckedChange={(v) => ch('siblings_included', !!v)} />
            <Label>Siblings Included</Label>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Family Notes</Label>
          <Textarea value={val('family_notes') as string} onChange={(e) => ch('family_notes', e.target.value)} rows={2} />
        </div>
      </TabsContent>

      <TabsContent value="benefits" className="grid gap-4 mt-4">
        <div className="space-y-2">
          <Label>Benefits</Label>
          <TagInput value={tags('benefits')} onChange={(v) => ch('benefits', v)} placeholder="Add benefit, press Enter" />
        </div>
        <div className="space-y-2">
          <Label>Travel Access Highlights</Label>
          <TagInput value={tags('travel_access_highlights')} onChange={(v) => ch('travel_access_highlights', v)} placeholder="Add highlight, press Enter" />
        </div>
        <div className="space-y-2">
          <Label>Highlights</Label>
          <TagInput value={tags('highlights')} onChange={(v) => ch('highlights', v)} placeholder="Add highlight, press Enter" />
        </div>
      </TabsContent>

      <TabsContent value="crypto" className="grid gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Checkbox checked={bool('crypto_accepted')} onCheckedChange={(v) => ch('crypto_accepted', !!v)} />
          <Label>Crypto Accepted</Label>
        </div>
        <div className="space-y-2">
          <Label>Crypto Notes</Label>
          <Textarea value={val('crypto_notes') as string} onChange={(e) => ch('crypto_notes', e.target.value)} rows={2} />
        </div>
      </TabsContent>

      <TabsContent value="consultation" className="grid gap-4 mt-4">
        <div className="space-y-2">
          <Label>Consultant Pitch</Label>
          <Textarea value={val('consultant_pitch') as string} onChange={(e) => ch('consultant_pitch', e.target.value)} rows={4} />
        </div>
        <div className="space-y-2">
          <Label>Ideal Client Profile</Label>
          <Textarea value={val('ideal_client_profile') as string} onChange={(e) => ch('ideal_client_profile', e.target.value)} rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Key Talking Points</Label>
          <TagInput value={tags('key_talking_points')} onChange={(v) => ch('key_talking_points', v)} placeholder="Add talking point, press Enter" />
        </div>
        <div className="space-y-2">
          <Label>Objections & Responses (JSON)</Label>
          <JsonInput value={val('objections')} onChange={(v) => ch('objections', v)} placeholder='[{"objection": "Too expensive", "response": "Compare to..."}]' rows={6} />
        </div>
        <div className="space-y-2">
          <Label>Competitor Comparison</Label>
          <Textarea value={val('competitor_comparison') as string} onChange={(e) => ch('competitor_comparison', e.target.value)} rows={2} />
        </div>
        <div className="space-y-2">
          <Label>Red Flags</Label>
          <TagInput value={tags('red_flags')} onChange={(v) => ch('red_flags', v)} placeholder="Add red flag, press Enter" />
        </div>
        <div className="space-y-2">
          <Label>Closing Tips</Label>
          <Textarea value={val('closing_tips') as string} onChange={(e) => ch('closing_tips', e.target.value)} rows={3} />
        </div>
      </TabsContent>

      <TabsContent value="display" className="grid gap-4 mt-4">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Checkbox checked={bool('is_active')} onCheckedChange={(v) => ch('is_active', !!v)} />
            <Label>Active</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={bool('is_featured')} onCheckedChange={(v) => ch('is_featured', !!v)} />
            <Label>Featured</Label>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Sort Order</Label>
          <Input type="number" value={num('sort_order')} onChange={(e) => ch('sort_order', Number(e.target.value))} />
        </div>
      </TabsContent>
    </Tabs>
  );
}

const AdminPrograms = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({ ...emptyForm });

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['admin-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('country');
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (program: Record<string, unknown>) => {
      const { error } = await supabase.from('programs').insert(program as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
      toast.success('Program created');
      setAddOpen(false);
    },
    onError: (err: Error) =>
      toast.error('Failed to create program', { description: err.message }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Record<string, unknown> & { id: string }) => {
      const { error } = await supabase
        .from('programs')
        .update(updates as any)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
      toast.success('Program updated');
      setEditOpen(false);
    },
    onError: (err: Error) =>
      toast.error('Failed to update program', { description: err.message }),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({
      id,
      is_active,
    }: {
      id: string;
      is_active: boolean;
    }) => {
      const { error } = await supabase
        .from('programs')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
      toast.success('Status toggled');
    },
    onError: (err: Error) =>
      toast.error('Failed to toggle status', { description: err.message }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
      toast.success('Program deleted');
      setDeleteId(null);
    },
    onError: (err: Error) =>
      toast.error('Failed to delete program', { description: err.message }),
  });

  const filtered = programs.filter((p) => {
    const matchSearch =
      !search || p.country.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === 'all' || p.region === regionFilter;
    const matchType = typeFilter === 'all' || p.program_type === typeFilter;
    const matchFeatured =
      featuredFilter === 'all' ||
      (featuredFilter === 'yes' && p.is_featured) ||
      (featuredFilter === 'no' && !p.is_featured);
    return matchSearch && matchRegion && matchType && matchFeatured;
  });

  const openEdit = (program: ProgramRow) => {
    setSelectedId(program.id);
    setFormData({ ...program });
    setEditOpen(true);
  };

  const openAdd = () => {
    setSelectedId(null);
    setFormData({ ...emptyForm });
    setAddOpen(true);
  };

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        Loading programs...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Programs</h1>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Program Type" />
          </SelectTrigger>
          <SelectContent>
            {programTypes.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Featured</SelectItem>
            <SelectItem value="no">Not Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Program Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Min Investment</TableHead>
              <TableHead>Processing Time</TableHead>
              <TableHead>Visa-Free</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <span className="mr-2">{p.flag_emoji}</span>
                  {p.country}
                </TableCell>
                <TableCell>{p.program_name || p.country}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      p.program_type === 'citizenship'
                        ? 'bg-amber-500 text-white hover:bg-amber-500'
                        : 'bg-blue-500 text-white hover:bg-blue-500'
                    }
                  >
                    {p.program_type}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(p.min_investment)}</TableCell>
                <TableCell>{p.processing_time}</TableCell>
                <TableCell>{p.visa_free_countries ?? '—'}</TableCell>
                <TableCell>
                  <Badge variant={p.is_featured ? 'default' : 'secondary'}>
                    {p.is_featured ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      p.is_active
                        ? 'bg-green-500 text-white hover:bg-green-500'
                        : 'bg-red-500 text-white hover:bg-red-500'
                    }
                  >
                    {p.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(p)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        toggleMutation.mutate({
                          id: p.id,
                          is_active: !p.is_active,
                        })
                      }
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setDeleteId(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-muted-foreground py-8"
                >
                  No programs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>Update program details below.</DialogDescription>
          </DialogHeader>
          <ProgramForm data={formData} onChange={handleChange} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                updateMutation.mutate({ id: selectedId!, ...formData })
              }
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Program</DialogTitle>
            <DialogDescription>
              Create a new investment migration program.
            </DialogDescription>
          </DialogHeader>
          <ProgramForm data={formData} onChange={handleChange} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => createMutation.mutate(formData)}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create Program'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Program</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this program and all its data. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPrograms;
