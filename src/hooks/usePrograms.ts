import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Program, programs as staticPrograms } from '@/data/programs';
import { toast } from 'sonner';

const mapDbToProgram = (row: any): Program => ({
  id: row.slug || row.id,
  country: row.country,
  region: row.region === 'middle_east' ? 'middle-east' : row.region,
  flag: row.flag_emoji || row.flag || '',
  minInvestment: row.min_investment,
  investmentType: row.investment_options
    ? (row.investment_options as any[]).map((o: any) => o.type).join(' or ')
    : row.investment_type || '',
  processingTime: row.processing_time || '',
  visaFreeCountries: row.visa_free_countries || 0,
  familyInclusion: row.family_included ?? row.family_inclusion ?? true,
  dualCitizenship: row.dual_citizenship ?? true,
  physicalPresence: row.physical_presence || 'Not required',
  highlights: row.highlights || [],
  description: row.description || '',
  programType: row.program_type === 'residency' ? 'residency' : 'citizenship',
  image: row.image || `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80`,
  isCryptoFriendly: row.crypto_accepted ?? row.is_crypto_friendly ?? false,
  isNew: row.is_featured ?? row.is_new ?? false,
  isPopular: row.is_popular ?? row.is_featured ?? false,
  comingSoon: row.coming_soon ?? !row.is_active,
  tagline: row.tagline || undefined,
});

export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async (): Promise<Program[]> => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      if (!data || data.length === 0) return staticPrograms;
      return data.filter((r: any) => r.is_active !== false).map(mapDbToProgram);
    },
  });
};

export const useProgram = (id: string | undefined) => {
  return useQuery({
    queryKey: ['programs', id],
    queryFn: async (): Promise<Program | undefined> => {
      if (!id) return undefined;
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .or(`id.eq.${id},slug.eq.${id}`)
        .maybeSingle();
      if (error) throw error;
      if (!data) return staticPrograms.find((p) => p.id === id);
      return mapDbToProgram(data);
    },
    enabled: !!id,
  });
};

export const useEnquiries = () => {
  return useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateEnquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from('enquiries').update(updates as any).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
      toast.success('Enquiry updated');
    },
    onError: (err: any) => {
      toast.error('Error updating enquiry', { description: err.message });
    },
  });
};
