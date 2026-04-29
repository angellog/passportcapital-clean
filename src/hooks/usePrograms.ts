import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Program, programs as staticPrograms } from '@/data/programs';
import { toast } from 'sonner';

const mapDbToProgram = (row: any): Program => ({
  id: row.id,
  country: row.country,
  region: row.region,
  flag: row.flag,
  minInvestment: row.min_investment,
  investmentType: row.investment_type,
  processingTime: row.processing_time,
  visaFreeCountries: row.visa_free_countries,
  familyInclusion: row.family_inclusion,
  dualCitizenship: row.dual_citizenship,
  physicalPresence: row.physical_presence,
  highlights: row.highlights || [],
  description: row.description,
  programType: row.program_type,
  image: row.image,
  isCryptoFriendly: row.is_crypto_friendly,
  isNew: row.is_new,
  isPopular: row.is_popular,
  comingSoon: row.coming_soon,
  tagline: row.tagline,
  timezone: row.timezone,
  language: row.language,
  currency: row.currency,
  population: row.population,
  passportValidity: row.passport_validity,
  aboutCountry: row.about_country,
  legalFramework: row.legal_framework,
  keyBenefits: row.key_benefits,
  costBreakdown: row.cost_breakdown,
  eligibility: row.eligibility,
  requiredDocuments: row.required_documents,
  visaFreeByRegion: row.visa_free_by_region,
  faqs: row.faqs,
  timeline: row.timeline,
});

export const mapProgramToDb = (p: Partial<Program> & { id: string }) => ({
  id: p.id,
  country: p.country,
  region: p.region,
  flag: p.flag,
  min_investment: p.minInvestment,
  investment_type: p.investmentType,
  processing_time: p.processingTime,
  visa_free_countries: p.visaFreeCountries,
  family_inclusion: p.familyInclusion,
  dual_citizenship: p.dualCitizenship,
  physical_presence: p.physicalPresence,
  highlights: p.highlights || [],
  description: p.description,
  program_type: p.programType,
  image: p.image,
  is_crypto_friendly: p.isCryptoFriendly || false,
  is_new: p.isNew || false,
  is_popular: p.isPopular || false,
  coming_soon: p.comingSoon || false,
  tagline: p.tagline || null,
  timezone: p.timezone || null,
  language: p.language || null,
  currency: p.currency || null,
  population: p.population || null,
  passport_validity: p.passportValidity || null,
  about_country: p.aboutCountry || null,
  legal_framework: p.legalFramework || null,
  key_benefits: p.keyBenefits || null,
  cost_breakdown: p.costBreakdown || null,
  eligibility: p.eligibility || null,
  required_documents: p.requiredDocuments || null,
  visa_free_by_region: p.visaFreeByRegion || null,
  faqs: p.faqs || null,
  timeline: p.timeline || null,
});

export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async (): Promise<Program[]> => {
      const { data, error } = await (supabase as any)
        .from('programs')
        .select('*')
        .order('country');

      if (error) throw error;
      if (!data || data.length === 0) return staticPrograms;
      return (data as any[]).map(mapDbToProgram);
    },
  });
};

export const useProgram = (id: string | undefined) => {
  return useQuery({
    queryKey: ['programs', id],
    queryFn: async (): Promise<Program | undefined> => {
      if (!id) return undefined;
      const { data, error } = await (supabase as any)
        .from('programs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return staticPrograms.find((p) => p.id === id);
      }
      return mapDbToProgram(data);
    },
    enabled: !!id,
  });
};

export const useCreateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program: Program) => {
      const dbData = mapProgramToDb(program);
      const { error } = await (supabase as any).from('programs').insert(dbData);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast.success('Program created successfully');
    },
    onError: (err: any) => {
      toast.error('Error creating program', { description: err.message });
    },
  });
};

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (program: Program) => {
      const dbData = mapProgramToDb(program);
      const { error } = await (supabase as any).from('programs').update(dbData).eq('id', program.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast.success('Program updated successfully');
    },
    onError: (err: any) => {
      toast.error('Error updating program', { description: err.message });
    },
  });
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('programs').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast.success('Program deleted successfully');
    },
    onError: (err: any) => {
      toast.error('Error deleting program', { description: err.message });
    },
  });
};

export const useSeedPrograms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const dbData = staticPrograms.map(mapProgramToDb);
      const { error } = await (supabase as any).from('programs').upsert(dbData, { onConflict: 'id' });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast.success('All programs imported successfully');
    },
    onError: (err: any) => {
      toast.error('Error importing programs', { description: err.message });
    },
  });
};
